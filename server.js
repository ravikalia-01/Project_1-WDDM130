const { name } = require('ejs')
const express = require('express')
const app = express()
 
//ejs will allow us to reference the javascript within html
//in a seperate file
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

 
app.use(express.static('public'))
 
//using middleware to get the current page
//referencing the current page in header.ejs
app.use((req, res, next) => {
    app.locals.currentRoute = req.path
    next()
})
 
const HTTP_PORT = process.env.PORT || 8088
 
//using EJS template engine, you have to say render
//for it to render the home.ejs
app.get('/', (req, res) => {
    res.render('home',{
        title: 'Home Page',
        image1: '/images/home1.jpg',
        image2: '/images/home2.jpg',
        image3: '/images/home3.jpg',
        image4: '/images/home4.jpg',
        image5: '/images/home5.jpg',
        message1: `EJS (Embedded JavaScript) is a lightweight templating engine commonly used with Node.js to render dynamic HTML pages. It allows developers to embed JavaScript code directly within HTML using special tags, enabling dynamic content generation based on server-side data. With EJS, you can easily include variables, loops, conditionals, and partial templates, making it ideal for building modular and reusable web pages. It's especially popular in Express.js applications, where it helps in creating views that respond to user input or database content. EJS combines the simplicity of HTML with the power of JavaScript, making it a flexible and efficient choice for server-side rendering.`,

        data: 'A UX/UI web developer is a creative and detail-oriented professional who designs and builds user-friendly websites and applications with a strong focus on user experience (UX) and user interface (UI) design. They combine technical skills with a deep understanding of user behavior to create intuitive, visually appealing, and responsive digital interfaces. Their role involves wireframing, prototyping, front-end coding (often using HTML, CSS, and JavaScript), and collaborating with designers, developers, and stakeholders to ensure that the final product not only looks great but also functions smoothly across all devices. By prioritizing usability, accessibility, and aesthetics, a UX/UI web developer helps deliver seamless online experiences that meet both user needs and business goals.'
    })
})
 
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        image: '/images/home2.jpg',
        message: 'A UX/UI web developer is a creative and detail-oriented professional who designs and builds user-friendly websites and applications with a strong focus on user experience (UX) and user interface (UI) design. They combine technical skills with a deep understanding of user behavior to create intuitive, visually appealing, and responsive digital interfaces. Their role involves wireframing, prototyping, front-end coding (often using HTML, CSS, and JavaScript), and collaborating with designers, developers, and stakeholders to ensure that the final product not only looks great but also functions smoothly across all devices. By prioritizing usability, accessibility, and aesthetics, a UX/UI web developer helps deliver seamless online experiences that meet both user needs and business goals.'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact',{
        title: 'Contact Us',
        email: 'ManishaSharma007@gmail.com',
        phone: '123-456-7890',
        address: '123 Robert St, Toronto, ON, Canada',
        message: `If you have any questions or need assistance, please feel free to reach out to us. We are here to help you with any inquiries you may have. You can contact us via email at Manisha Sharma007@gmail.com, call us at 123-456-7890, or visit us at our office located at #123, Robert St, Toronto, Ontario, Canada. We look forward to hearing from you!`,
    })
})

// app.js or routes/contact.js
app.post('/sendMessage', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log('Contact Form Submission:', { name, email, subject, message });

    // You can save this to DB or send an email here

    res.send('Thank you for contacting us!');
});


app.get('/profile', (req, res) => {
    res.render('profile',{
        title: 'Profile',
        group: 'Group 2',
        course: 'Web Application Development',
        program: 'Web Design and Development',
        project: 'Project-1 : A Basic Web Application',
        Image: '/images/home2.jpg',
        about: 'This is your profile page. Here you can view the group info and and Project information here. When you click on Members details button you can directed to a page containing a table of member details.',
    })
})

app.get("/membersInfo", function(req, res) {
    let someData = {
        studentid: 'N01719809',
        name: 'Ravi',
        age: 30,
        hobbies: ['coding', 'reading', 'gaming'],
        occupation: 'Web designer and developer',
        institute: 'Humber Polytechnic Institute',
        location: 'Toronto, Canada',

        studentid2: 'N01716841',
        name2: 'Manisha Sharma',
        age2: 33,
        hobbies2: ['painting', 'hiking', 'photography'],
        occupation2: 'Graphic designer',
        institute: 'Humber Polytechnic Institute',
        location: 'Toronto, Canada',

        studentid3: 'N01740892',
        name3: 'Gurjaap Singh',
        age3: 22,
        hobbies3: ['Cricket', 'hiking', 'Reading'],
        occupation3: 'Graphic designer',
        institute: 'Humber Polytechnic Institute',
        location: 'Toronto, Canada',
    }
 
    res.render('membersInfo', {
        data: someData,
    })
})

app.get('/setting', (req, res) => {
    res.render('setting',{ 
        title: 'Setting',
        message: 'This is your setting page. Here you can manage your account settings, preferences, and privacy options. If you need assistance with any settings, please contact our support team.',
        username: 'Manisha Sharma',
        theme: 'Light Mode',
        time: 'thursday, 26 October 2023, 10:00 AM',
        notifications: 'Enabled',
        privacy: 'Public',
    })
})
const DEMO_USER = { email: "user@example.com", password: "password123" }; 
// Middleware for showing error
function flashError(req, res, next) {
  res.locals.error = '';
  next();
}

// Login GET: Show form
app.get('/login', flashError, (req, res) => {
  res.render('login', { error: '' });
});

// Login POST: Handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    // You'd set a session here
    return res.redirect('/'); // Or dashboard, user recipes, etc.
  } else {
    // Invalid login
    return res.render('login', { error: "Invalid email or password." });
  }
});

// GET Sign up
app.get('/signup', (req, res) => {
  res.render('signup', { error: "" });
});

// POST Sign up
app.post('/signup', (req, res) => {
  const { name, email, password, confirm } = req.body;
  if (!name || !email || !password || password !== confirm) {
    return res.render('signup', { error: "Please fill all fields and ensure passwords match." });
  }
  // ...additional signup logic
  res.redirect('/login');
});


 

 
app.listen(HTTP_PORT, () => {
    console.log(`server listening: http://localhost:${HTTP_PORT}`)
})