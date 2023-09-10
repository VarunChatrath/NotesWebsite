import { React } from 'react'
import img from './noteback.webp'
import img2 from './noteback2.webp'

export const About = () => {

  return (
    <section className="vh-100" style={{
      backgroundColor: '#eee', backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100" style={{ width: '85%', marginLeft: "400px", backgroundColor: "transparent" }}>
          <div className="col col-lg-9 col-xl-7">
            <div className=" ">
              <div className="card-body " style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', margin: "0px"
              }}>
                <div classname=" text-center" style={{ color: 'wheat' }}>
                  <h1 classname="text-center">About Us</h1>
                  <p>Welcome to MindWrite, where you can organize and manage your notes efficiently.</p>
                  <h2>Our Story</h2>
                  <p>MindWrite began with a simple goal: to make note-taking easier and more enjoyable for everyone.</p>
                  <p>Over the years, we've grown with the support of our users.</p>
                  <p>Today, we're committed to enhancing your note-taking experience and helping you stay organized in your personal and professional life. Thank you for being a part of our journey.</p>

                  <h2 classname="text-center">Our Mission</h2>
                  <p>Our mission is to provide a user-friendly platform for note-taking and organization, empowering users to stay productive and organized in their personal and professional lives.</p>

                  <h2 classname="text-center">Why Choose Us</h2>
                  <p>We are committed to delivering the best note-taking experience with a focus on simplicity, usability, and reliability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

