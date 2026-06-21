// ─── OFFICIAL COGNIZANT MODULE-WISE TIMETABLE ───────────────────────────────
// Source: CTSTrack_Antigravity_Prompt.md (DN5.0 Deepskilling Handbook — Python FSE)
// Structured exactly as Cognizant's own 4 "FSE constructs" — nothing invented,
// nothing compressed, no custom dates. "Official" = handbook's stated days only.

export const CONSTRUCTS = [
  {
    id: "C1", color: "#4F46E5",
    name: "Engineering Concepts",
    handbookQuote: "Please plan to complete the skills in 2 days.",
    officialDays: 2, page: "p.7",
    modules: [
      {
        id: "M1", name: "Module 1 — Design Patterns & Principles",
        pdf: "📘 HandBook",
        official: "shares 2-day block",
        topics: ["SOLID Principles", "Creational, Structural, Behavioral Patterns"],
        subTopics: [
          {
            id: "m1-st1", heading: "SOLID Principles",
            links: [
              { id: "m1-st1-l1", label: "SOLID Principles — Baeldung", url: "https://www.baeldung.com/solid-principles" },
            ],
          },
          {
            id: "m1-st2", heading: "Commonly Used Design Patterns",
            links: [
              { id: "m1-st2-l1", label: "Design Patterns Overview — Medium", url: "https://medium.com/@softwaretechsolution/design-pattern-81ef65829de2" },
            ],
          },
        ],
        quizzes: [
          { id: "m1-q1", label: "Design Patterns Quiz — JavaGuides", url: "https://www.javaguides.net/2023/07/design-patterns-quiz.html" },
        ],
      },
      {
        id: "M2", name: "Module 2 — Data Structures & Algorithms",
        pdf: "📘 HandBook",
        official: "shares 2-day block",
        topics: ["Time/Space Complexity", "Sorting & Searching Algorithms"],
        subTopics: [
          {
            id: "m2-st1", heading: "Analysis of Algorithms",
            links: [
              { id: "m2-st1-l1", label: "Analysis of Algorithms", url: "https://www.javaguides.net/2023/07/design-patterns-quiz.html" },
            ],
          },
          {
            id: "m2-st2", heading: "Sorting",
            links: [
              { id: "m2-st2-l1", label: "Sorting Algorithms — GeeksforGeeks", url: "https://www.geeksforgeeks.org/sorting-algorithms/" },
            ],
          },
          {
            id: "m2-st3", heading: "Arrays",
            links: [
              { id: "m2-st3-l1", label: "Array Data Structure Guide — GeeksforGeeks", url: "https://www.geeksforgeeks.org/array-data-structure-guide/" },
            ],
          },
          {
            id: "m2-st4", heading: "Searching",
            links: [
              { id: "m2-st4-l1", label: "Searching Algorithms — GeeksforGeeks", url: "https://www.geeksforgeeks.org/searching-algorithms/#basics-of-searching-algorithms" },
            ],
          },
        ],
        quizzes: [
          { id: "m2-q1", label: "DSA Objective Quiz — ProProfs", url: "https://www.proprofs.com/quiz-school/story.php?title=data-structures-algorithms-mcqs-objective-set-1" },
        ],
      },
    ],
  },
  {
    id: "C2", color: "#2563EB",
    name: "Programming Languages",
    handbookQuote: "Please plan to complete this in 6 days.",
    officialDays: 6, page: "p.10",
    modules: [
      {
        id: "M3", name: "Module 3 — Database Integration (PostgreSQL, MySQL & MongoDB)",
        pdf: "📂 DatabaseIntegration_HandsOn.pdf (7 Hands-On)",
        official: "2 days (handbook) — PDF itself says 4 days, plan for more time",
        topics: ["PostgreSQL/MySQL DDL & DML", "Subqueries, Views, Transactions, Indexes", "MongoDB, SQLAlchemy ORM, Alembic"],
        subTopics: [
          {
            id: "m3-st1", heading: "Advanced Concepts (MySQL)",
            links: [
              { id: "m3-st1-l1", label: "MySQL Reference Manual — Tutorial", url: "https://dev.mysql.com/doc/refman/8.0/en/tutorial.html" },
              { id: "m3-st1-l2", label: "MySQL Tutorial — W3Schools", url: "https://www.w3schools.com/mysql/" },
              { id: "m3-st1-l3", label: "MySQL Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/mysql-tutorial/" },
            ],
          },
          {
            id: "m3-st2", heading: "PostgreSQL",
            links: [
              { id: "m3-st2-l1", label: "PostgreSQL Tutorial — Official Docs", url: "https://www.postgresql.org/docs/current/tutorial.html" },
              { id: "m3-st2-l2", label: "PostgreSQL Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/postgresql-tutorial/" },
              { id: "m3-st2-l3", label: "PostgreSQL Tutorial — W3Schools", url: "https://www.w3schools.com/postgresql/" },
              { id: "m3-st2-l4", label: "PostgreSQL Tutorial — TutorialsPoint", url: "https://www.tutorialspoint.com/postgresql/index.htm" },
            ],
          },
          {
            id: "m3-st3", heading: "MongoDB",
            links: [
              { id: "m3-st3-l1", label: "Getting Started — MongoDB Docs", url: "https://www.mongodb.com/docs/manual/tutorial/getting-started/" },
              { id: "m3-st3-l2", label: "MongoDB Tutorial — W3Schools", url: "https://www.w3schools.com/mongodb/" },
              { id: "m3-st3-l3", label: "MongoDB Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/mongodb-tutorial/" },
              { id: "m3-st3-l4", label: "MongoDB University — Learn", url: "https://learn.mongodb.com/" },
            ],
          },
          {
            id: "m3-st4", heading: "Database Schema Design",
            links: [
              { id: "m3-st4-l1", label: "Database Design Introduction — GeeksforGeeks", url: "https://www.geeksforgeeks.org/database-design-introduction/" },
              { id: "m3-st4-l2", label: "Database Design Best Practices — Vertabelo", url: "https://vertabelo.com/blog/database-design-best-practices/" },
              { id: "m3-st4-l3", label: "Database Normalization — Guru99", url: "https://www.guru99.com/database-normalization.html" },
            ],
          },
          {
            id: "m3-st5", heading: "Query Optimization",
            links: [
              { id: "m3-st5-l1", label: "SQL Performance Tuning — GeeksforGeeks", url: "https://www.geeksforgeeks.org/sql-performance-tuning/" },
              { id: "m3-st5-l2", label: "Use The Index, Luke!", url: "https://use-the-index-luke.com/" },
              { id: "m3-st5-l3", label: "Using EXPLAIN — PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/using-explain.html" },
            ],
          },
          {
            id: "m3-st6", heading: "Migrations & Versioning",
            links: [
              { id: "m3-st6-l1", label: "Django Migrations — Official Docs", url: "https://docs.djangoproject.com/en/stable/topics/migrations/" },
              { id: "m3-st6-l2", label: "Alembic Tutorial", url: "https://alembic.sqlalchemy.org/en/latest/tutorial.html" },
              { id: "m3-st6-l3", label: "Flask-Migrate Docs", url: "https://flask-migrate.readthedocs.io/en/latest/" },
            ],
          },
          {
            id: "m3-st7", heading: "ORMs & ODMs",
            links: [
              { id: "m3-st7-l1", label: "SQLAlchemy ORM Quickstart", url: "https://docs.sqlalchemy.org/en/20/orm/quickstart.html" },
              { id: "m3-st7-l2", label: "Django Making Queries — Official Docs", url: "https://docs.djangoproject.com/en/stable/topics/db/queries/" },
              { id: "m3-st7-l3", label: "Mongoose Guide", url: "https://mongoosejs.com/docs/guide.html" },
            ],
          },
        ],
        quizzes: [
          { id: "m3-q1", label: "PostgreSQL Quiz — W3Schools", url: "https://www.w3schools.com/postgresql/postgresql_quiz.php" },
          { id: "m3-q2", label: "PostgreSQL Joins Quiz — TutorialsPoint", url: "https://www.tutorialspoint.com/postgresql/quiz_on_postgresql_using_joins.htm" },
          { id: "m3-q3", label: "MongoDB Online Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/mongodb/mongodb-online-quiz-test-your-nosql-knowledge/" },
          { id: "m3-q4", label: "Database Design Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/introduction-to-database-design-quiz/" },
          { id: "m3-q5", label: "SQL Optimization Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/sql-optimization/" },
          { id: "m3-q6", label: "SQL Indexes Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/sql-indexes-quiz/" },
          { id: "m3-q7", label: "Views, Indexes, Triggers Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/views-indexes-triggers-quiz/" },
          { id: "m3-q8", label: "Stored Procedure Basics Quiz — ProProfs", url: "https://www.proprofs.com/quiz-school/quizzes/pp-stored-procedure-basics-quiz" },
        ],
      },
      {
        id: "M4", name: "Module 4 — Unit Testing (PyTest, unittest, Jest & Mocha)",
        pdf: "📘 HandBook",
        official: "4 days",
        topics: ["PyTest fixtures, parametrize, coverage", "unittest.mock, TDD Red-Green-Refactor"],
        subTopics: [
          {
            id: "m4-st1", heading: "Testing Fundamentals",
            links: [
              { id: "m4-st1-l1", label: "Software Testing Basics — GeeksforGeeks", url: "https://www.geeksforgeeks.org/softwareengineering-software-testing-basics/" },
              { id: "m4-st1-l2", label: "Practical Test Pyramid — Martin Fowler", url: "https://martinfowler.com/articles/practicaltest-pyramid.html" },
              { id: "m4-st1-l3", label: "Python Testing Guide — Real Python", url: "https://realpython.com/python-testing/" },
            ],
          },
          {
            id: "m4-st2", heading: "PyTest",
            links: [
              { id: "m4-st2-l1", label: "Pytest Getting Started — Official Docs", url: "https://docs.pytest.org/en/stable/getting-started.html" },
              { id: "m4-st2-l2", label: "Pytest Guide — Real Python", url: "https://realpython.com/pytest-python-testing/" },
              { id: "m4-st2-l3", label: "Pytest Getting Started — GeeksforGeeks", url: "https://www.geeksforgeeks.org/python/pytest-getting-started/" },
              { id: "m4-st2-l4", label: "Modern TDD — TestDriven.io", url: "https://testdriven.io/blog/modern-tdd/" },
            ],
          },
          {
            id: "m4-st3", heading: "Python unittest",
            links: [
              { id: "m4-st3-l1", label: "unittest Documentation — Python Docs", url: "https://docs.python.org/3/library/unittest.html" },
              { id: "m4-st3-l2", label: "Python unittest Guide — Real Python", url: "https://realpython.com/python-unittest" },
              { id: "m4-st3-l3", label: "unittest.mock Documentation — Python Docs", url: "https://docs.python.org/3/library/unittest.mock.html" },
            ],
          },
          {
            id: "m4-st4", heading: "Jest (JavaScript)",
            links: [
              { id: "m4-st4-l1", label: "Jest Getting Started — Official Docs", url: "https://jestjs.io/docs/getting-started" },
              { id: "m4-st4-l2", label: "Jest Tutorial — W3Schools", url: "https://www.w3schools.com/jest/" },
              { id: "m4-st4-l3", label: "React Testing Library — Intro Docs", url: "https://testing-library.com/docs/react-testing-library/intro/" },
              { id: "m4-st4-l4", label: "Jest React Tutorial — Official Docs", url: "https://jestjs.io/docs/tutorial-react" },
            ],
          },
          {
            id: "m4-st5", heading: "Mocha (JavaScript)",
            links: [
              { id: "m4-st5-l1", label: "Mocha Documentation — Official Website", url: "https://mochajs.org/" },
              { id: "m4-st5-l2", label: "Unit Testing Mocha & Chai — GeeksforGeeks", url: "https://www.geeksforgeeks.org/unit-testing-using-mocha-and-chai/" },
              { id: "m4-st5-l3", label: "Chai BDD API Documentation", url: "https://www.chaijs.com/api/bdd/" },
            ],
          },
          {
            id: "m4-st6", heading: "Mocking & Test",
            links: [
              { id: "m4-st6-l1", label: "Mocks Aren't Stubs — Martin Fowler", url: "https://martinfowler.com/articles/mocksArentStubs.html" },
              { id: "m4-st6-l2", label: "Python Mock Library — Real Python", url: "https://realpython.com/python-mock-library/" },
              { id: "m4-st6-l3", label: "Sinon.JS Documentation", url: "https://sinonjs.org/" },
            ],
          },
          {
            id: "m4-st7", heading: "Test-Driven Development",
            links: [
              { id: "m4-st7-l1", label: "TDD Overview — GeeksforGeeks", url: "https://www.geeksforgeeks.org/test-driven-development-tdd/" },
              { id: "m4-st7-l2", label: "Test Driven Development — Martin Fowler", url: "https://martinfowler.com/bliki/TestDrivenDevelopment.html" },
              { id: "m4-st7-l3", label: "TDD Guide — TestDriven.io", url: "https://testdriven.io/test-driven-development/" },
            ],
          },
          {
            id: "m4-st8", heading: "Code Coverage & Quality",
            links: [
              { id: "m4-st8-l1", label: "Coverage.py Documentation", url: "https://coverage.readthedocs.io/" },
              { id: "m4-st8-l2", label: "NYC (Istanbul Command Line Interface)", url: "https://github.com/istanbuljs/nyc" },
              { id: "m4-st8-l3", label: "ESLint Getting Started — Official Docs", url: "https://eslint.org/docs/latest/use/getting-started" },
            ],
          },
        ],
        quizzes: [
          { id: "m4-q1", label: "Pytest Intro Quiz — TutorialsPoint", url: "https://www.tutorialspoint.com/pytest/quiz_on_pytest_introduction.htm" },
          { id: "m4-q2", label: "Python unittest Quiz — Real Python", url: "https://realpython.com/quizzes/python-unittest/" },
          { id: "m4-q3", label: "React Testing Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/testing-in-react/" },
          { id: "m4-q4", label: "Mocha, Chai & Sinon Practice — ExpandTesting", url: "https://practice.expandtesting.com/mocha-chai-sinon-player" },
          { id: "m4-q5", label: "Red-Green-Refactor Quiz — ProProfs", url: "https://www.proprofs.com/quiz-school/quizzes/pp-tdd-red-green-refactor-cycle-quiz" },
          { id: "m4-q6", label: "Pytest MCQs with Answers — FreshersNow", url: "https://www.freshersnow.com/pytest-mcqs-and-answers-with-explanation/" },
        ],
      },
    ],
  },
  {
    id: "C3", color: "#16A34A",
    name: "Products and Frameworks",
    handbookQuote: "Please plan to complete this in 4 weeks' time.",
    officialDays: 28, page: "p.14",
    modules: [
      {
        id: "M5", name: "Module 5 — Python Backend Frameworks",
        pdf: "📂 PythonBackendFrameworks_HandsOn.pdf (10 Hands-On)",
        official: "4 days",
        topics: ["Django (setup, ORM, DRF)", "Flask (Blueprints, SQLAlchemy)", "FastAPI (Pydantic, async, JWT)", "REST best practices, Microservices"],
        subTopics: [
          {
            id: "m5-st1", heading: "Web Framework Foundation",
            links: [
              { id: "m5-st1-l1", label: "Python Web Development with Django — GeeksforGeeks", url: "https://www.geeksforgeeks.org/python/python-web-development-django/" },
              { id: "m5-st1-l2", label: "Web Development Tutorials — Real Python", url: "https://realpython.com/tutorials/web-dev/" },
              { id: "m5-st1-l3", label: "First Steps in Server-side Programming — MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps" },
            ],
          },
          {
            id: "m5-st2", heading: "Django Framework",
            links: [
              { id: "m5-st2-l1", label: "Django Tutorial: Part 1 — Official Docs", url: "https://docs.djangoproject.com/en/stable/intro/tutorial01/" },
              { id: "m5-st2-l2", label: "Python Django Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/python-django/" },
              { id: "m5-st2-l3", label: "Get Started With Django Part 1 — Real Python", url: "https://realpython.com/get-started-with-django-1/" },
              { id: "m5-st2-l4", label: "Django Tutorial — W3Schools", url: "https://www.w3schools.com/django/" },
            ],
          },
          {
            id: "m5-st3", heading: "Flask Framework",
            links: [
              { id: "m5-st3-l1", label: "Flask Quickstart — Official Docs", url: "https://flask.palletsprojects.com/en/stable/quickstart/" },
              { id: "m5-st3-l2", label: "Flask Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/flask-tutorial/" },
              { id: "m5-st3-l3", label: "Flask Tutorials — Real Python", url: "https://realpython.com/tutorials/flask/" },
              { id: "m5-st3-l4", label: "Flask Tutorial — TutorialsPoint", url: "https://www.tutorialspoint.com/flask/index.htm" },
            ],
          },
          {
            id: "m5-st4", heading: "FastAPI Framework",
            links: [
              { id: "m5-st4-l1", label: "FastAPI Tutorial — Official Docs", url: "https://fastapi.tiangolo.com/tutorial/" },
              { id: "m5-st4-l2", label: "FastAPI Introduction — GeeksforGeeks", url: "https://www.geeksforgeeks.org/python/fastapi-introduction/" },
              { id: "m5-st4-l3", label: "FastAPI Python Web APIs — Real Python", url: "https://realpython.com/fastapi-python-web-apis/" },
              { id: "m5-st4-l4", label: "FastAPI CRUD Tutorial — TestDriven.io", url: "https://testdriven.io/blog/fastapi-crud/" },
            ],
          },
          {
            id: "m5-st5", heading: "RESTful API Design",
            links: [
              { id: "m5-st5-l1", label: "REST API Introduction — GeeksforGeeks", url: "https://www.geeksforgeeks.org/rest-api-introduction/" },
              { id: "m5-st5-l2", label: "RESTful API Tutorial — Best Practices", url: "https://restfulapi.net/" },
              { id: "m5-st5-l3", label: "What is a REST API? — Red Hat", url: "https://www.redhat.com/en/topics/api/what-is-a-rest-api" },
              { id: "m5-st5-l4", label: "API Design Best Practices — Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design" },
            ],
          },
          {
            id: "m5-st6", heading: "Microservices Architecture",
            links: [
              { id: "m5-st6-l1", label: "Microservices Architecture — GeeksforGeeks", url: "https://www.geeksforgeeks.org/microservices/" },
              { id: "m5-st6-l2", label: "Microservices Patterns & Benefits", url: "https://microservices.io/patterns/microservices.html" },
              { id: "m5-st6-l3", label: "Microservices Guide — Martin Fowler", url: "https://martinfowler.com/articles/microservices.html" },
              { id: "m5-st6-l4", label: "What are Microservices? — AWS", url: "https://aws.amazon.com/microservices/" },
            ],
          },
          {
            id: "m5-st7", heading: "Authentication & Security",
            links: [
              { id: "m5-st7-l1", label: "JSON Web Token (JWT) — GeeksforGeeks", url: "https://www.geeksforgeeks.org/computer-networks/json-web-token-jwt/" },
              { id: "m5-st7-l2", label: "OAuth 2.0 Official Framework Guide", url: "https://oauth.net/2/" },
              { id: "m5-st7-l3", label: "OWASP Top Ten Web Application Security Risks", url: "https://owasp.org/www-project-top-ten/" },
              { id: "m5-st7-l4", label: "Token-Based Auth with Flask — Real Python", url: "https://realpython.com/token-based-authentication-with-flask/" },
            ],
          },
        ],
        quizzes: [
          { id: "m5-q1", label: "Django Quiz — W3Schools", url: "https://www.w3schools.com/django/django_quiz.php" },
          { id: "m5-q2", label: "Flask Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/flask/" },
          { id: "m5-q3", label: "FastAPI Intro Quiz — TutorialsPoint", url: "https://www.tutorialspoint.com/fastapi/quiz_on_fastapi_introduction.htm" },
          { id: "m5-q4", label: "RESTful API Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/restful-api/" },
          { id: "m5-q5", label: "JWT Authentication Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/authentication-with-jwt-quiz/" },
          { id: "m5-q6", label: "OAuth 2.0 Overview Quiz — TutorialsPoint", url: "https://www.tutorialspoint.com/oauth2.0/quiz_on_oauth2.0_overview.htm" },
          { id: "m5-q7", label: "Microservices MCQ Quiz — JavaGuides", url: "https://www.javaguides.net/2023/01/microservices-quiz-mcq-multiple-choice.html" },
        ],
      },
      {
        id: "M6", name: "Module 6 — Frontend Development Basics (React, Angular & Vue.js overview)",
        pdf: "📂 FrontendDevelopment_HandsOn.pdf (10 Hands-On) — PDF calls this \"Module 2\"; GitHub folder must be Module2_FrontendDev/<YourName>/",
        official: "9 days",
        topics: ["HTML5/CSS3/JS ES6+", "React, Angular, Vue.js", "Accessibility, State management"],
        subTopics: [
          {
            id: "m6-st1", heading: "Web Foundations",
            links: [
              { id: "m6-st1-l1", label: "MDN Web Development Learning Area", url: "https://developer.mozilla.org/en-US/docs/Learn" },
              { id: "m6-st1-l2", label: "HTML Tutorial — W3Schools", url: "https://www.w3schools.com/html/" },
              { id: "m6-st1-l3", label: "CSS Tutorial — W3Schools", url: "https://www.w3schools.com/css/" },
              { id: "m6-st1-l4", label: "The Modern JavaScript Tutorial", url: "https://javascript.info/" },
            ],
          },
          {
            id: "m6-st2", heading: "React.js",
            links: [
              { id: "m6-st2-l1", label: "Quick Start Guide — React Docs", url: "https://react.dev/learn" },
              { id: "m6-st2-l2", label: "React Tutorial — W3Schools", url: "https://www.w3schools.com/react/" },
              { id: "m6-st2-l3", label: "ReactJS Tutorials — GeeksforGeeks", url: "https://www.geeksforgeeks.org/reactjs-tutorials/" },
              { id: "m6-st2-l4", label: "React Router Installation Guide", url: "https://reactrouter.com/start/library/installation" },
            ],
          },
          {
            id: "m6-st3", heading: "Angular",
            links: [
              { id: "m6-st3-l1", label: "Angular Tutorials — Official Docs", url: "https://angular.dev/tutorials" },
              { id: "m6-st3-l2", label: "AngularJS Tutorial — W3Schools", url: "https://www.w3schools.com/angular/" },
              { id: "m6-st3-l3", label: "Angular Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/angular-tutorial/" },
              { id: "m6-st3-l4", label: "TypeScript Handbook Introduction", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
            ],
          },
          {
            id: "m6-st4", heading: "Vue.js",
            links: [
              { id: "m6-st4-l1", label: "Vue.js Introduction — Official Docs", url: "https://vuejs.org/guide/introduction.html" },
              { id: "m6-st4-l2", label: "Vue.js Tutorial — W3Schools", url: "https://www.w3schools.com/vue/" },
              { id: "m6-st4-l3", label: "VueJS Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/vue-js/" },
              { id: "m6-st4-l4", label: "Vue Router Getting Started Docs", url: "https://router.vuejs.org/guide/" },
            ],
          },
          {
            id: "m6-st5", heading: "Responsive Design",
            links: [
              { id: "m6-st5-l1", label: "Responsive Web Design Intro — W3Schools", url: "https://www.w3schools.com/css/css_rwd_intro.asp" },
              { id: "m6-st5-l2", label: "Learn Responsive Design — web.dev", url: "https://web.dev/learn/design/" },
              { id: "m6-st5-l3", label: "Responsive Design Guide — MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" },
            ],
          },
          {
            id: "m6-st6", heading: "Web Accessibility (a11y)",
            links: [
              { id: "m6-st6-l1", label: "Accessibility Introduction — W3C WAI", url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/" },
              { id: "m6-st6-l2", label: "Learn Accessibility — web.dev", url: "https://web.dev/learn/accessibility/" },
              { id: "m6-st6-l3", label: "Web Accessibility Guides — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" },
              { id: "m6-st6-l4", label: "Accessibility Checklist — The A11Y Project", url: "https://www.a11yproject.com/checklist/" },
            ],
          },
          {
            id: "m6-st7", heading: "Cross-Browser Compatibility",
            links: [
              { id: "m6-st7-l1", label: "Cross Browser Testing Guide — MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing" },
              { id: "m6-st7-l2", label: "Can I use... Support tables for HTML5/CSS3", url: "https://caniuse.com/" },
              { id: "m6-st7-l3", label: "Cross Browser Testing Guide — BrowserStack", url: "https://www.browserstack.com/guide/cross-browser-testing" },
            ],
          },
          {
            id: "m6-st8", heading: "API Integration & State",
            links: [
              { id: "m6-st8-l1", label: "Fetch API Reference — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" },
              { id: "m6-st8-l2", label: "Axios Introduction — Official Docs", url: "https://axios-http.com/docs/intro" },
              { id: "m6-st8-l3", label: "Redux Essentials Part 1 — Official Docs", url: "https://redux.js.org/tutorials/essentials/part-1-overview-concepts" },
            ],
          },
        ],
        quizzes: [
          { id: "m6-q1", label: "HTML/CSS Quiz — W3Schools", url: "https://www.w3schools.com/htmlcss/htmlcss_quiz.asp" },
          { id: "m6-q2", label: "JavaScript Quiz — W3Schools", url: "https://www.w3schools.com/js/js_quiz.asp" },
          { id: "m6-q3", label: "React Quiz — W3Schools", url: "https://www.w3schools.com/REACT/react_quiz.asp" },
          { id: "m6-q4", label: "AngularJS Quiz — W3Schools", url: "https://www.w3schools.com/angular/angular_quiz.asp" },
          { id: "m6-q5", label: "Vue.js Quiz — W3Schools", url: "https://www.w3schools.com/vue/vue_quiz.php" },
          { id: "m6-q6", label: "Responsive Web Design Quiz — freeCodeCamp", url: "https://www.freecodecamp.org/learn/responsive-web-design-v9/quiz-responsive-webdesign/quiz-responsive-web-design" },
        ],
      },
      {
        id: "M7", name: "Module 7 — QA Concepts & Test Automation (Selenium Basics)",
        pdf: "📂 SeleniumBasics_HandsOn.pdf (7 Hands-On) + SkillSpring \"Selenium Interactive Course\" (supplementary)",
        official: "6 days",
        topics: ["SDLC vs TDLC, V-Model", "Selenium WebDriver, locators", "Page Object Model (POM)"],
        subTopics: [
          {
            id: "m7-st1", heading: "QA Concepts & Functional Testing",
            links: [
              { id: "m7-st1-l1", label: "Software Testing Basics — GeeksforGeeks", url: "https://www.geeksforgeeks.org/softwareengineering-software-testing-basics/" },
              { id: "m7-st1-l2", label: "Software Testing Introduction — Guru99", url: "https://www.guru99.com/software-testing.html" },
              { id: "m7-st1-l3", label: "Software Testing Tutorial — TutorialsPoint", url: "https://www.tutorialspoint.com/software_testing/index.htm" },
              { id: "m7-st1-l4", label: "Functional Testing Guide — BrowserStack", url: "https://www.browserstack.com/guide/functional-testing" },
            ],
          },
          {
            id: "m7-st2", heading: "SDLC vs TDLC",
            links: [
              { id: "m7-st2-l1", label: "Software Development Life Cycle — GeeksforGeeks", url: "https://www.geeksforgeeks.org/sdlc-software-development-life-cycle/" },
              { id: "m7-st2-l2", label: "Test Case Development Life Cycle — Guru99", url: "https://www.guru99.com/test-case-development-life-cycle-testing-process.html" },
              { id: "m7-st2-l3", label: "SDLC V-Model Guide — TutorialsPoint", url: "https://www.tutorialspoint.com/sdlc/sdlc_v_model.htm" },
            ],
          },
          {
            id: "m7-st3", heading: "Test Automation Process & Lifecycle",
            links: [
              { id: "m7-st3-l1", label: "Test Automation Overview — GeeksforGeeks", url: "https://www.geeksforgeeks.org/test-automation-in-software-testing/" },
              { id: "m7-st3-l2", label: "Automation Testing Tutorial — Guru99", url: "https://www.guru99.com/automation-testing.html" },
              { id: "m7-st3-l3", label: "Test Automation Frameworks — BrowserStack", url: "https://www.browserstack.com/guide/test-automation-framework" },
              { id: "m7-st3-l4", label: "Automated Testing Basics — Atlassian", url: "https://www.atlassian.com/continuous-delivery/software-testing/automated-testing" },
            ],
          },
          {
            id: "m7-st4", heading: "Selenium Basics",
            links: [
              { id: "m7-st4-l1", label: "Selenium WebDriver Getting Started", url: "https://www.selenium.dev/documentation/webdriver/getting_started/" },
              { id: "m7-st4-l2", label: "Selenium Python Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/selenium-python-tutorial/" },
              { id: "m7-st4-l3", label: "Selenium Tutorial — Guru99", url: "https://www.guru99.com/selenium-tutorial.html" },
              { id: "m7-st4-l4", label: "Web Automation with Python & Selenium — Real Python", url: "https://realpython.com/modern-web-automation-with-python-and-selenium/" },
            ],
          },
          {
            id: "m7-st5", heading: "Selenium - Page Object Model (POM)",
            links: [
              { id: "m7-st5-l1", label: "Page Object Models — Official Selenium Docs", url: "https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/" },
              { id: "m7-st5-l2", label: "POM & Page Factory Guide — Guru99", url: "https://www.guru99.com/page-object-model-pom-page-factory-in-selenium-ultimate-guide.html" },
              { id: "m7-st5-l3", label: "POM in Selenium — BrowserStack", url: "https://www.browserstack.com/guide/page-object-model-in-selenium" },
            ],
          },
        ],
        quizzes: [
          { id: "m7-q1", label: "Selenium MCQ Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/selenium-mcq/" },
          { id: "m7-q2", label: "Selenium MCQ Quiz — Guru99", url: "https://www.guru99.com/selenium-mcq-quiz.html" },
          { id: "m7-q3", label: "Selenium MCQs with Answers — Sanfoundry", url: "https://www.sanfoundry.com/selenium-multiple-choice-questions-answers/" },
          { id: "m7-q4", label: "Selenium MCQ Quiz — JavaTpoint", url: "https://www.javatpoint.com/selenium-mcq" },
          { id: "m7-q5", label: "Selenium Quizzes — ProProfs", url: "https://www.proprofs.com/quiz-school/topic/selenium" },
        ],
      },
    ],
  },
  {
    id: "C4", color: "#D97706",
    name: "Platforms",
    handbookQuote: "Please plan to complete this in 1.5 weeks.",
    officialDays: 11, page: "p.21",
    modules: [
      {
        id: "M8", name: "Module 8 — Agile, Code Review & Cross-Functional Collaboration",
        pdf: "📘 HandBook",
        official: "no individual split given by Cognizant",
        topics: ["Scrum ceremonies, Sprint planning", "Branching, PR workflow, Kanban"],
        subTopics: [
          {
            id: "m8-st1", heading: "Agile Foundations",
            links: [
              { id: "m8-st1-l1", label: "Agile Tutorials — Atlassian", url: "https://www.atlassian.com/agile" },
              { id: "m8-st1-l2", label: "Agile Development Models — GeeksforGeeks", url: "https://www.geeksforgeeks.org/software-engineering-agile-development-models/" },
              { id: "m8-st1-l3", label: "The Agile Manifesto", url: "https://agilemanifesto.org/" },
              { id: "m8-st1-l4", label: "What is Agile? — Scrum.org", url: "https://www.scrum.org/learning-series/what-is-agile" },
            ],
          },
          {
            id: "m8-st2", heading: "Scrum Framework",
            links: [
              { id: "m8-st2-l1", label: "What is Scrum? — Scrum.org", url: "https://www.scrum.org/learning-series/what-is-scrum" },
              { id: "m8-st2-l2", label: "Scrum Guide — Atlassian", url: "https://www.atlassian.com/agile/scrum" },
              { id: "m8-st2-l3", label: "Scrum Software Development — GeeksforGeeks", url: "https://www.geeksforgeeks.org/scrum-software-development-model/" },
            ],
          },
          {
            id: "m8-st3", heading: "Kanban",
            links: [
              { id: "m8-st3-l1", label: "Kanban Guide — Atlassian", url: "https://www.atlassian.com/agile/kanban" },
              { id: "m8-st3-l2", label: "Kanban Methodology — GeeksforGeeks", url: "https://www.geeksforgeeks.org/kanban-an-agile-methodology/" },
              { id: "m8-st3-l3", label: "Official Kanban Guide", url: "https://kanbanguides.org/english/" },
            ],
          },
          {
            id: "m8-st4", heading: "Git & GitHub Workflow",
            links: [
              { id: "m8-st4-l1", label: "Pro Git Book", url: "https://git-scm.com/book/en/v2" },
              { id: "m8-st4-l2", label: "GitHub Getting Started Docs", url: "https://docs.github.com/en/get-started" },
              { id: "m8-st4-l3", label: "Git Tutorials — Atlassian", url: "https://www.atlassian.com/git/tutorials" },
              { id: "m8-st4-l4", label: "Learn Git Branching — Interactive Game", url: "https://learngitbranching.js.org/" },
            ],
          },
          {
            id: "m8-st5", heading: "Code Review Practices",
            links: [
              { id: "m8-st5-l1", label: "Google Engineering Practices: Code Review", url: "https://google.github.io/eng-practices/review/" },
              { id: "m8-st5-l2", label: "Code Review Process — GeeksforGeeks", url: "https://www.geeksforgeeks.org/code-review-process/" },
              { id: "m8-st5-l3", label: "Awesome Code Review Resources", url: "https://github.com/joho/awesome-code-review" },
              { id: "m8-st5-l4", label: "Code Review Best Practices — Palantir", url: "https://medium.com/palantir/code-review-best-practices-19e02780015f" },
            ],
          },
          {
            id: "m8-st6", heading: "DevOps Collaboration",
            links: [
              { id: "m8-st6-l1", label: "DevOps Guide — Atlassian", url: "https://www.atlassian.com/devops" },
              { id: "m8-st6-l2", label: "DevOps Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/devops-tutorial/" },
              { id: "m8-st6-l3", label: "What is DevOps? — AWS", url: "https://aws.amazon.com/devops/what-is-devops/" },
            ],
          },
          {
            id: "m8-st7", heading: "Project Tracking Tools",
            links: [
              { id: "m8-st7-l1", label: "Jira Getting Started — Atlassian", url: "https://www.atlassian.com/software/jira/guides/getting-started/introduction" },
              { id: "m8-st7-l2", label: "Azure Boards Documentation — Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/devops/boards/" },
              { id: "m8-st7-l3", label: "GitHub Projects Planning Guide", url: "https://docs.github.com/en/issues/planning-and-tracking-with-projects" },
            ],
          },
        ],
        quizzes: [
          { id: "m8-q1", label: "Agile Quiz — World of Agile", url: "https://worldofagile.com/free-agile-resources/agile-quiz/" },
          { id: "m8-q2", label: "Scrum Estimation Quiz — TutorialsPoint", url: "https://www.tutorialspoint.com/scrum/quiz_on_scrum_estimation.htm" },
          { id: "m8-q3", label: "Git Quiz — W3Schools", url: "https://www.w3schools.com/git/git_quiz.asp" },
          { id: "m8-q4", label: "Git Practice Exercises — GeeksforGeeks", url: "https://www.geeksforgeeks.org/git/git-exercise/" },
          { id: "m8-q5", label: "Jira MCQ Quiz — JavaGuides", url: "https://www.javaguides.net/2024/08/jira-quiz-mcq-questions-and-answers.html" },
        ],
      },
      {
        id: "M9", name: "Module 9 — Cloud Deployment",
        pdf: "📘 HandBook",
        official: "no individual split given by Cognizant",
        topics: ["Docker, Dockerfile, containers", "CI/CD (GitHub Actions), AWS/Azure/GCP basics"],
        subTopics: [
          {
            id: "m9-st1", heading: "Amazon Web Services (AWS)",
            links: [
              { id: "m9-st1-l1", label: "Getting Started with AWS", url: "https://aws.amazon.com/getting-started/" },
              { id: "m9-st1-l2", label: "AWS Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/amazon-web-services-tutorial/" },
              { id: "m9-st1-l3", label: "AWS Elastic Beanstalk Welcome Guide", url: "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html" },
              { id: "m9-st1-l4", label: "Amazon Web Services Tutorial — TutorialsPoint", url: "https://www.tutorialspoint.com/amazon_web_services/index.htm" },
            ],
          },
          {
            id: "m9-st2", heading: "Microsoft Azure",
            links: [
              { id: "m9-st2-l1", label: "Azure Training & Learning Paths — Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/azure/" },
              { id: "m9-st2-l2", label: "Microsoft Azure Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/microsoft-azure-tutorial/" },
              { id: "m9-st2-l3", label: "Azure App Service Overview — Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/app-service/overview" },
              { id: "m9-st2-l4", label: "Azure DevOps Documentation — Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/devops/" },
            ],
          },
          {
            id: "m9-st3", heading: "Google Cloud Platform (GCP)",
            links: [
              { id: "m9-st3-l1", label: "GCP Get Started Guides", url: "https://cloud.google.com/docs/get-started" },
              { id: "m9-st3-l2", label: "Google Cloud Platform Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/google-cloud-platform-gcp-tutorial/" },
              { id: "m9-st3-l3", label: "Cloud Run Quickstarts — GCP Docs", url: "https://cloud.google.com/run/docs/quickstarts" },
              { id: "m9-st3-l4", label: "Google Cloud Training & Certification", url: "https://cloud.google.com/learn/training" },
            ],
          },
          {
            id: "m9-st4", heading: "Docker & Containerization",
            links: [
              { id: "m9-st4-l1", label: "Docker Get Started Guide", url: "https://docs.docker.com/get-started/" },
              { id: "m9-st4-l2", label: "Introduction to Docker — GeeksforGeeks", url: "https://www.geeksforgeeks.org/devops/introduction-to-docker/" },
              { id: "m9-st4-l3", label: "Docker Curriculum (Practical Guide)", url: "https://docker-curriculum.com/" },
              { id: "m9-st4-l4", label: "Docker Compose Getting Started", url: "https://docs.docker.com/compose/gettingstarted/" },
            ],
          },
          {
            id: "m9-st5", heading: "Kubernetes Basics",
            links: [
              { id: "m9-st5-l1", label: "Kubernetes Basics Tutorial", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
              { id: "m9-st5-l2", label: "Kubernetes Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/devops/kubernetes-tutorial/" },
              { id: "m9-st5-l3", label: "Learn Kubernetes Learning Path", url: "https://learnk8s.io/learning" },
            ],
          },
          {
            id: "m9-st6", heading: "CI/CD Pipelines",
            links: [
              { id: "m9-st6-l1", label: "What is CI/CD? — GeeksforGeeks", url: "https://www.geeksforgeeks.org/devops/what-is-ci-cd/" },
              { id: "m9-st6-l2", label: "Learn GitHub Actions — Official Docs", url: "https://docs.github.com/en/actions/learn-github-actions" },
              { id: "m9-st6-l3", label: "Azure Pipelines Get Started — Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/" },
              { id: "m9-st6-l4", label: "CI/CD Guide & Concepts — GitLab", url: "https://about.gitlab.com/topics/ci-cd/" },
            ],
          },
          {
            id: "m9-st7", heading: "Cloud Security & Monitoring",
            links: [
              { id: "m9-st7-l1", label: "AWS Identity & Access Management (IAM)", url: "https://aws.amazon.com/iam/" },
              { id: "m9-st7-l2", label: "Azure Security Fundamentals — Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/security/fundamentals/overview" },
              { id: "m9-st7-l3", label: "GCP Cloud Security Overview", url: "https://cloud.google.com/security/overview" },
            ],
          },
        ],
        quizzes: [
          { id: "m9-q1", label: "AWS Cloud Practitioner Quiz — W3Schools", url: "https://www.w3schools.com/quiztest/quiztest.php?qtest=AWSCE" },
          { id: "m9-q2", label: "AWS Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/amazon-web-services-quiz/" },
          { id: "m9-q3", label: "Microsoft Azure MCQ Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/microsoft-azure-mcq/" },
          { id: "m9-q4", label: "GCP MCQ Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/google-cloud-platform-gcp-mcq/" },
          { id: "m9-q5", label: "Docker MCQ Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/docker-mcq/" },
          { id: "m9-q6", label: "Kubernetes MCQ Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/kubernetes-mcq/" },
          { id: "m9-q7", label: "DevOps & CI/CD MCQ Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/devops-ci-cd-mcq/" },
          { id: "m9-q8", label: "Cloud Security MCQ Quiz — GeeksforGeeks", url: "https://www.geeksforgeeks.org/quizzes/cloud-computing-security-mcq/" },
        ],
      },
      {
        id: "M10", name: "Module 10 — Gen AI Fundamentals",
        pdf: "🎓 Cognizant SkillSpring platform (4 courses, no PDF)",
        official: "no individual split given by Cognizant",
        topics: ["Prompt Engineering (zero/few-shot, CoT)", "GitHub Copilot setup & responsible use"],
        subTopics: [
          {
            id: "m10-st1", heading: "Introduction to Generative AI",
            links: [
              { id: "m10-st1-l1", label: "SkillSpring: Fundamentals of Generative AI (Course)", url: "https://skillspring.cognizant.com" },
              { id: "m10-st1-l2", label: "What is Generative AI? — GeeksforGeeks (AI)", url: "https://www.geeksforgeeks.org/artificial-intelligence/what-is-generative-ai/" },
              { id: "m10-st1-l3", label: "What is Generative AI? — GeeksforGeeks", url: "https://www.geeksforgeeks.org/what-is-generative-ai/" },
              { id: "m10-st1-l4", label: "History of Generative AI — Business Management Blog", url: "https://businessmanagementblog.com/history-of-generative-ai/" },
            ],
          },
          {
            id: "m10-st2", heading: "Context Engineering",
            links: [
              { id: "m10-st2-l1", label: "Context Engineering Guide — DataCamp", url: "https://www.datacamp.com/blog/context-engineering" },
              { id: "m10-st2-l2", label: "What is Context Engineering? — Simplilearn", url: "https://www.simplilearn.com/what-is-context-engineering-article" },
              { id: "m10-st2-l3", label: "Introduction to Context Engineering — KDnuggets", url: "https://www.kdnuggets.com/a-gentle-introduction-to-context-engineering-in-llms" },
            ],
          },
          {
            id: "m10-st3", heading: "Prompt Engineering – Techniques, Best Practices & Ethics",
            links: [
              { id: "m10-st3-l1", label: "SkillSpring: Prompt Engineering Foundation (Course)", url: "https://skillspring.cognizant.com" },
            ],
          },
          {
            id: "m10-st4", heading: "Introduction to GitHub Copilot",
            links: [
              { id: "m10-st4-l1", label: "SkillSpring: GitHub Copilot Foundation Virtual Training Course", url: "https://skillspring.cognizant.com" },
            ],
          },
          {
            id: "m10-st5", heading: "Setup and Configuration",
            links: [
              { id: "m10-st5-l1", label: "How to Use GitHub Copilot with VS Code — freeCodeCamp", url: "https://www.freecodecamp.org/news/how-to-use-github-copilot-with-visual-studio-code/" },
              { id: "m10-st5-l2", label: "GitHub Copilot Overview — GeeksforGeeks", url: "https://www.geeksforgeeks.org/git/github-copilot/" },
            ],
          },
          {
            id: "m10-st6", heading: "Core Features and Capabilities",
            links: [
              { id: "m10-st6-l1", label: "GitHub Copilot Features — GeeksforGeeks", url: "https://www.geeksforgeeks.org/git/github-copilot/" },
              { id: "m10-st6-l2", label: "GitHub Copilot in VS Code — freeCodeCamp", url: "https://www.freecodecamp.org/news/how-to-use-github-copilot-with-visual-studio-code/" },
            ],
          },
          {
            id: "m10-st7", heading: "Security and Ethical Considerations",
            links: [
              { id: "m10-st7-l1", label: "GitHub Copilot Security & Privacy — GitGuardian", url: "https://blog.gitguardian.com/github-copilot-security-and-privacy/" },
              { id: "m10-st7-l2", label: "GitHub Copilot Ethics — GeeksforGeeks", url: "https://www.geeksforgeeks.org/git/github-copilot/" },
              { id: "m10-st7-l3", label: "Responsible Use & Code Review — GitHub Docs", url: "https://docs.github.com/en/copilot/responsible-use/code-review" },
            ],
          },
          {
            id: "m10-st8", heading: "Agentic AI Foundation",
            links: [
              { id: "m10-st8-l1", label: "SkillSpring: Introduction to Agentic AI (Course)", url: "https://skillspring.cognizant.com" },
              { id: "m10-st8-l2", label: "SkillSpring: Foundations of Modern AI (Course)", url: "https://skillspring.cognizant.com" },
            ],
          },
        ],
        quizzes: [
          { id: "m10-q1", label: "Generative AI Quiz — Great Learning", url: "https://www.mygreatlearning.com/blog/generative-ai-quiz/" },
          { id: "m10-q2", label: "Prompt Engineering MCQ Quiz — AIToolsNote", url: "https://aitoolsnote.com/quiz-prompt-engineering-mcq/" },
          { id: "m10-q3", label: "Prompt Engineering MCQs — TechnicalBlog", url: "https://technicalblog.in/languagewise-mcqs/prompt-engineering-mcqs/" },
          { id: "m10-q4", label: "GitHub Copilot Practice Test — ExamsLand", url: "https://examsland.com/free-practice-test/github-copilot/" },
        ],
      },
    ],
  },
];

export const OFFICIAL_TOTAL = CONSTRUCTS.reduce((s, c) => s + c.officialDays, 0); // 47
