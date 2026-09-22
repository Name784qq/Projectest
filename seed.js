require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import your models
const User = require('./models/User');
const Course = require('./models/Course');
const Offering = require('./models/Offering');
const Registration = require('./models/Registration');
const Record = require('./models/Record');

async function seedDatabase() {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected. Clearing old data...');

        // Clear existing data to prevent duplicates on multiple runs
        await User.deleteMany({});
        await Course.deleteMany({});
        await Offering.deleteMany({});
        await Registration.deleteMany({});
        await Record.deleteMany({});

        // Hash a default password for all test accounts
        const passwordHash = await bcrypt.hash('password123', 10);

        console.log('Creating test Admin and Advisor...');
        const admin = await User.create({
            name: 'System Admin',
            email: 'admin@university.edu',
            passwordHash,
            role: 'admin'
        });

        const advisor = await User.create({
            name: 'Dr. Jane Smith',
            email: 'advisor@university.edu',
            passwordHash,
            role: 'advisor'
        });

        console.log('Creating 25 anonymised students...');
        const students = [];
        for (let i = 1; i <= 25; i++) {
            const student = await User.create({
                name: `Test Student ${i}`,
                email: `student${i}@university.edu`,
                passwordHash,
                role: 'student',
                studentId: `999000${i.toString().padStart(3, '0')}`, // Invented IDs
                advisorId: advisor._id
            });
            students.push(student);
        }

        console.log('Creating courses...');
        const courses = await Course.insertMany([
            { code: 'IT101', title: 'Introduction to IT', credits: 3, description: 'Basic IT concepts' },
            { code: 'CSC220', title: 'Web Development II', credits: 4, description: 'MERN Stack' },
            { code: 'CSC102', title: 'Programming Fundamentals', credits: 3, description: 'Basics of coding' }
        ]);

        console.log('Creating course offerings for term 2026-1...');
        await Offering.insertMany([
            {
                courseId: courses[1]._id, // CSC220
                term: '2026-1',
                section: 1,
                day: 'Monday',
                startTime: '09:00',
                endTime: '12:00',
                room: 'Lab 1',
                instructor: 'Prof. Alan Turing',
                seats: 30,
                addDropOpen: true
            },
            {
                courseId: courses[0]._id, // IT101
                term: '2026-1',
                section: 1,
                day: 'Tuesday',
                startTime: '13:00',
                endTime: '16:00',
                room: 'Room 204',
                instructor: 'Dr. Ada Lovelace',
                seats: 25,
                addDropOpen: true
            }
        ]);

        console.log('Creating historical records...');
        // Give Student 1 a passed grade to test the "Not already passed" rule
        await Record.create({
            studentId: students[0]._id,
            courseId: courses[0]._id, // IT101
            term: '2025-2',
            grade: 'B+'
        });

        // Give Student 2 an 'F' grade to test the "Retake required" rule
        await Record.create({
            studentId: students[1]._id,
            courseId: courses[1]._id, // CSC220
            term: '2025-2',
            grade: 'F'
        });

        console.log('\nDatabase seeded successfully!');
        console.log('Test Accounts (Password for all is "password123"):');
        console.log(`Admin: ${admin.email}`);
        console.log(`Advisor: ${advisor.email}`);
        console.log(`Student 1: ${students[0].email} (Has passed IT101)`);
        console.log(`Student 2: ${students[1].email} (Has failed CSC220)`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();