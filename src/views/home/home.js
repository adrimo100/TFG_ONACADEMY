import React, {useContext, useEffect, useState} from "react";

import "./home.css"
import {Context} from "../../store/context";
import SubjectCard from "../../components/card/subject-card";

const Home = () => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllSubjects();
    }, [])

    const getSubjectsCards = () => {
        return store.subjects.map(subject => {
           return <div key={subject.id} className="my-2 col-12 col-md-6 col-lg-4 d-flex justify-content-center">
               <SubjectCard subject={subject} redirectionUrl={`/subject/${subject.id}`}></SubjectCard>
           </div>
        })
    }

    return (
      <React.Fragment>
        <div className="text-center">
          <div className="container-fluid">
            <div className="row" id="first-header">
              <div className="row" id="first-hearder-filter">
                <div className="col-2 d-none d-md-block"></div>
                <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
                  <div
                    className="w-75 h-50 d-flex justify-content-center align-items-center"
                    id="first-hearder-text-background"
                  >
                    <div className="text-center">
                      <div className="text-center w-100">
                        <h1 className="" id="title-text">
                          ONACADEMY
                        </h1>
                      </div>
                      <div className="w-100 text-center">
                        <p id="subtitle-text" className="text-white">
                          Aprender nunca fue tan libre
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2 d-none d-md-block"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row home-texture pt-3" id="second-header">
          <div className="col-md-2 d-none d-md-block"></div>
          <div className="col-12 col-md-8 text-center">
            <div className="row d-flex align-items-center h-100">
              <div className="col-12 col-lg-4 text-center details-column">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-mortarboard-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z" />
                  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z" />
                </svg>
                <div className="my-4">
                  <h4 className="nowrap">Apredinzaje Personalizado</h4>
                </div>
                <div>
                  <p className="feature-description">
                    Creemos en la eficacia de esta metodología, que en los
                    últimos años ha demostrado dar mejores resultados que la
                    educación tradicional.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-4 text-center details-column">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-book-half"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                <div className="my-4">
                  <h4 className="nowrap">Apuntes Propios</h4>
                </div>
                <div>
                  <p className="feature-description">
                    Contarás siempre con el apoyo de nuestros propios apuntes,
                    para asegurarnos que tienes siempre un contenido base para
                    estudiar.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-4 text-center details-column">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
                <div className="my-4">
                  <h4 className="nowrap">Ejercicios y Feedback</h4>
                </div>
                <div>
                  <p className="feature-description">
                    Contarás con nuestras colecciones de ejercicios, los cuales
                    ajustarán automáticamente su dificultado para asegurar que
                    adquieres los conocimientos que deseas.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2 d-none d-md-block"></div>
        </div>
        <div className="subjects">
          <div className="d-flex justify-content-center align-items-center">
            <h1>LISTA DE ASIGNATURAS</h1>
          </div>
          <div className="subjects__list row">{getSubjectsCards()}</div>
        </div>
      </React.Fragment>
    );
}

export default Home;
