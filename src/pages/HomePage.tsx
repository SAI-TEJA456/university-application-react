//Created by Liesetty
import sectionImage from "../Images/section1H.jpg"
//1rem = 16px
const HomePage = () =>{
    return (
        <div className="container-fluid mt-5">
            <div
              className="position-relative d-flex align-items-center justify-content-center bg-dark text-white"
              style={{
                height: "450px",
                backgroundImage: `url(${sectionImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
              <div className="position-relative text-center">
                <h1 className="display-4 fw-bold mb-3">Find Your Dream University</h1>
                <p className="lead">Search from top-rated public and private universities</p>
              </div>
              <div className="position-absolute" style={{ top: "70%" }}>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search universities or courses..." />
                  <button className="btn btn-primary" type="button">
                    <i className="bi bi-search"></i> Search
                  </button>
                </div>
              </div>
            </div>

        <section className="my-5 container">
          <h2 className="fw-bold mb-4">Top Universities</h2>
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <div className="col">
              <div className="card shadow-sm h-100">
                <img src="https://via.placeholder.com/300x150" className="card-img-top" alt="University" />
                <div className="card-body">
                  <h5 className="card-title">University Name</h5>
                  <p className="card-text text-muted">Public - Missouri, USA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-light py-5 text-center">
          <h2 className="fw-bold mb-3">What Is University Assistance?</h2>
          <p className="lead mx-auto" style={{ maxWidth: "720px" }}>
            Our platform connects students with top universities worldwide and allows representatives to manage applications.
            Use the dashboard to track progress, find the right courses, and chat directly with your advisor.
          </p>
        </section>

        <section className="bg-white py-5 text-center">
          <h2 className="fw-bold mb-4">Get in Touch</h2>
          <form className="mx-auto" style={{ maxWidth: "600px" }}>
            <input type="text" className="form-control mb-3" placeholder="Full Name" />
            <input type="email" className="form-control mb-3" placeholder="Email" />
            <textarea rows={4} className="form-control mb-3" placeholder="Your Message"></textarea>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </section>

        <footer className="bg-dark text-white py-3 text-center">
          <nav className="mb-2">
            <a href="#" className="text-white text-decoration-none me-3">Home</a>
            <a href="#" className="text-white text-decoration-none me-3">Contact</a>
            <a href="#" className="text-white text-decoration-none">Universities</a>
          </nav>
          <p className="mb-0 small">&copy; 2025 University Assistance. All rights reserved.</p>
        </footer>
        </div>
    )
}


export default HomePage