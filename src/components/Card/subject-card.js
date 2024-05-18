import React from "react";
import {useNavigate} from "react-router-dom";
const SubjectCard = ({ subject, redirectionUrl }) => {
    const navigate = useNavigate();

    return (
        <div className="card" style={{ width: '18rem', display: 'flex', flexDirection: 'column' }}>
            <img src={subject.imageUrl ??
                "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"}
                 className="card-img-top" alt="subject-image" />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{subject.name ?? "-"}</h5>
                <p className="card-text" style={{ flex: 1 }}>{subject.description ?? ""}</p>
                <a className="btn btn-primary mt-auto" onClick={() => navigate(redirectionUrl)}>Ver cursos</a>
            </div>
        </div>
    )
}

export default SubjectCard;
