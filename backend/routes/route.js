const router = require('express').Router();

const { adminRegister, adminLogIn, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { studentRegister, studentLogIn, getStudents, getStudentDetail, updateStudent, studentAttendance, updateExamResult } = require('../controllers/student_controller.js');

const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, updateTeacher, updateTeacherSubject } = require('../controllers/teacher-controller.js');

const { noticeCreate, noticeList } = require('../controllers/notice-controller.js');

const { sclassCreate, sclassList, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');

const { subjectCreate, allSubjects, getSubjectDetail, classSubjects, freeSubjectList } = require('../controllers/subject-controller.js');

const { complainCreate, complainList } = require('../controllers/complain-controller.js');


// ================= ADMIN =================
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get('/Admin/:id', getAdminDetail);
router.put('/Admin/:id', updateAdmin);


// ================= STUDENT =================
router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn);
router.get('/Students/:id', getStudents);
router.get('/Student/:id', getStudentDetail);
router.put('/Student/:id', updateStudent);
router.put('/StudentAttendance/:id', studentAttendance);
router.put('/UpdateExamResult/:id', updateExamResult);


// ================= TEACHER =================
router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn);
router.get('/Teachers/:id', getTeachers);
router.get('/Teacher/:id', getTeacherDetail);
router.put('/Teacher/:id', updateTeacher);
router.put('/TeacherSubject', updateTeacherSubject);


// ================= NOTICE =================
router.post('/NoticeCreate', noticeCreate);
router.get('/NoticeList/:id', noticeList);


// ================= CLASS =================
router.post('/SclassCreate', sclassCreate);
router.get('/SclassList/:id', sclassList);
router.get('/Sclass/:id', getSclassDetail);
router.get('/Sclass/Students/:id', getSclassStudents);


// ================= SUBJECT =================
router.post('/SubjectCreate', subjectCreate);
router.get('/AllSubjects/:id', allSubjects);
router.get('/Subject/:id', getSubjectDetail);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);


// ================= COMPLAIN =================
router.post('/ComplainCreate', complainCreate);
router.get('/ComplainList/:id', complainList);

module.exports = router;
