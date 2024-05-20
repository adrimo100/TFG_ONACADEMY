import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../store/context";
import {useNavigate, useParams} from "react-router";

import "./course.css"
import ConfirmationModal from "../../components/modal/modal";

const Course = () => {
    const navigate = useNavigate();

    const {store, actions} = useContext(Context);

    const {subjectId, courseId} = useParams();

    const [currentLevel, setCurrentLevel] = useState(0);

    const [progress, setProgress] = useState(0);

    const [answersState, setAnswersState] = useState([]);

    const [isChecked, setIsChecked] = useState(false);

    const [isCourseCompleted, setIsCourseCompleted] = useState(false);

    useEffect(() => {
        actions.getCourse(courseId)

        actions.getRandomQuestionByCourseIdAndLevel(courseId, currentLevel)
    }, [])

    useEffect(() => {
        if(store.currentQuestion) {
            setAnswersState([...store.currentQuestion.answers])
        }
    }, [store.currentQuestion]);

    useEffect(() => {
        if(store.user){
            actions.getUserCourseByUserIdAndCourseId(store.user.id, courseId)
        }
        else {
            navigate("/")
        }

    }, [store.user])


    useEffect(() => {
        if (store.currentCourse && store.currentUserCourse) {
            let newLevel = -1;

            for (let i = 0; i < store.currentCourse.levels.length; i++) {
                if (store.currentUserCourse.userScore < store.currentCourse.levels[i].limitScore) {
                    newLevel = i;
                    break;
                }
            }

            if(newLevel < 0) {
                newLevel = store.currentCourse.levels.length - 1;
            }

            setCurrentLevel(newLevel);
            console.log("New current level set:", newLevel);

            let newProgress = (store.currentUserCourse.userScore * 100) / store.currentCourse.maxScore;
            if (newProgress >= 100) {
                newProgress = 100;
                setIsCourseCompleted(true);
            }
            setProgress(newProgress);
        }
    }, [store.currentCourse, store.currentUserCourse]);


    const resetCourse = () => {
        actions.deleteUserCourse(store.currentUserCourse?.id)

        navigate(`/subject/${subjectId}`)
    }

    const getAnswersCards = () => {

        const toggleSelect = (index) => {
            const newAnswers = [...answersState];
            newAnswers[index].isSelected = !newAnswers[index].isSelected;
            setAnswersState(newAnswers);
        };

        return answersState?.map((answer, index) => (
            <div key={index}
                 className={`answer-card mx-1 mt-2 col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center ${isChecked && answer.isCorrect ? "isCorrect" : ""}  ${isChecked && answer.isSelected && !answer.isCorrect ? "isIncorrect" : ""} ${!isChecked ? "pointer" : ""} ${answer.isSelected && !isChecked ? "isSelected" : ""}`}
                 onClick={() => {
                     if(!isChecked) toggleSelect(index)
                 }}>
                <strong>{answer.value}</strong>
            </div>
        ));
    };

    const checkAnswers = () => {
        setIsChecked(true)

        const incorrectAnswersSelected = answersState.filter(answer => answer.isSelected && !answer.isCorrect);

        let newUserScore = 0

        if(incorrectAnswersSelected.length > 0){
            newUserScore = store.currentUserCourse.userScore - store.currentCourse.incorrectAnswerPoints;
        }
        else {
            newUserScore = store.currentUserCourse.userScore + store.currentCourse.correctAnswerPoints;
        }

        newUserScore = newUserScore < 0 ? 0 : newUserScore;

        actions.updateUserCourse(newUserScore, store.currentUserCourse.id)
    }

    const getNextQuestion = () => {
        setIsChecked(!isChecked);

        actions.getRandomQuestionByCourseIdAndLevel(courseId, currentLevel)
    }

    const getCourseCard = () => {
      const completedCard = <div className="question-card">
          <h1 className="text-white">¡HAS COMPLETADO EL CURSO!</h1>
      </div>;

      const questionCard = (
        <div className="question-card">
          <h4 className="text-white">{store.currentQuestion?.statement}</h4>
          <div className="question-card__answers w-100 row">
            {getAnswersCards()}
          </div>
          {!isChecked ? (
            <button
              className="btn btn-primary w-50"
              onClick={() => checkAnswers()}
            >
              Comprobar respuestas
            </button>
          ) : (
            <button
              className="btn btn-success w-50"
              onClick={() => getNextQuestion()}
            >
              Siguiente pregunta
            </button>
          )}
        </div>
      );

      return !isCourseCompleted ? questionCard : completedCard;
    };

    return (
      <main className="course-page">
        <h1 className="mt-3 mb-3">{store.currentCourse?.name}</h1>
        <div className="course">
            {getCourseCard()}
          <div className="course-control">
            <div className="course-control__progress mb-3">
              <strong>Progreso total del curso:</strong>
              <div className="d-flex align-items-center">
                <div className="w-100">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <strong className="ms-1">{progress}%</strong>
              </div>
            </div>
            <div className="course-control__level mb-3">
              <strong>{`Nivel: ${currentLevel + 1}/${store.currentCourse?.levels.length}`}</strong>
            </div>
            <div className="course-control__buttons d-flex justify-content-center w-100">
              <button
                className="btn btn-warning"
                onClick={() => navigate(`/subject/${subjectId}`)}
              >
                Salir del Curso
              </button>
              <button
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#closeModal"
              >
                Reiniciar curso
              </button>
            </div>
          </div>
        </div>
        <ConfirmationModal
          modalId="closeModal"
          label="¿Quieres reiniciar el curso?"
          confirmAction={resetCourse}
        ></ConfirmationModal>
      </main>
    );
}

export default Course;
