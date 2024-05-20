import React, {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {Context} from "../../store/context";

import "./subject.css"

const Subject = () => {
    const navigate = useNavigate();

    const {subjectId} = useParams();

    const {store, actions} = useContext(Context);

    useEffect( () => {
       actions.getSubjectById(subjectId);

       actions.getCoursesBySubject(subjectId);

    }, []);

    useEffect(() => {

        if(store.user){
            actions.getAllUserCoursesByUserId(store.user.id);
        }

    }, [store.user])

    const getCourseProgress = (course, userCourse) => {

        const progress = (userCourse.userScore * 100) / course.maxScore;

        return progress >= 100 ? 100 : progress
    }


    const getCourseButtons = (course) => {
      const userCoursesFilteredByCourseId = store.usersCourses.filter(
        (userCourse) => userCourse?.courseId === course.id,
      );

      const courseIsStarted = userCoursesFilteredByCourseId.length > 0;

      const userCourse = userCoursesFilteredByCourseId[0];

      return (
        <React.Fragment>
          {courseIsStarted ? (
            <React.Fragment>
              <strong>Progreso del curso: </strong>
              <div className="course-progress d-flex align-items-center">
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "99%" }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${getCourseProgress(course, userCourse)}%`,
                    }}
                  ></div>
                </div>
                <strong className="ms-1">{getCourseProgress(course, userCourse)}%</strong>
              </div>
              <button
                className="btn btn-success mt-2"
                onClick={() => navigate(`course/${course.id}`)}
              >
                Continuar Curso
              </button>
            </React.Fragment>
          ) : (
            <button
              className="btn btn-primary"
              onClick={async () => {
                try {
                  await actions.createUserCourse(course, store.user?.id);

                  navigate(`course/${course.id}`);
                } catch (err) {}
              }}
            >
              Empezar Curso
            </button>
          )}
        </React.Fragment>
      );
    };
    const getCourses = () => {
      return (
        <React.Fragment>
          {store.courses.map((course, index) => (
            <div className="accordion-item mt-2 mb-2" key={index}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  <strong>{course.name}</strong>
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>{course.description}</p>
                  {store.user ? (
                    getCourseButtons(course)
                  ) : (
                    <strong>
                      <code>Inicia sesión para ver los cursos</code>
                    </strong>
                  )}
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      );
    };


    return (
        <main className="subject-page row">
            <div className="p-0">
                <img className="course-image"
                     src={store.currentSubject?.imageUrl || "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"}
                     alt="subject-img"/>
            </div>
            <div className="subject-details">
                <div>
                    <strong>Asignatura: </strong>
                    <span>{store.currentSubject?.name}</span>
                </div>
                <div>
                    <strong>Descripción: </strong>
                    <span>{store.currentSubject?.description || "Sin descripción"}</span>
                </div>
            </div>
            <div className="courses-list">
                <h1 className="mt-3 mb-3">CURSOS</h1>
                <div className="accordion mt-2" id="accordion">
                    {getCourses()}
                </div>
            </div>
        </main>
    );
};

export default Subject;
