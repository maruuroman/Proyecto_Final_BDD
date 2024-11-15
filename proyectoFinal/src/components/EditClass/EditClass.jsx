import { useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./EditClass.module.css"; // Asegúrate de tener un archivo de estilos si es necesario

const EditClass = ({ classes, onUpdateClass, instructors, students }) => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const classToEdit = classes.find((cl) => cl.id === classId);

  const [title, setTitle] = useState(classToEdit?.title || "");
  const [instructor, setInstructor] = useState(classToEdit?.instructor || "");
  const [shift, setShift] = useState(classToEdit?.shift || "");
  const [studentsInClass, setStudentsInClass] = useState(
    classToEdit?.students || []
  );

  const availableInstructors = instructors.filter(
    (inst) => !classes.some(
      (cls) => cls.shift === shift && cls.instructor === inst.name
    )
  );

  const handleStudentChange = (ci) => {
    if (!studentsInClass.includes(ci)) {
      setStudentsInClass([...studentsInClass, ci]);
    } else {
      setStudentsInClass(studentsInClass.filter((s) => s !== ci));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedClass = { title, instructor, shift, students: studentsInClass };
    onUpdateClass(classId, updatedClass);
    navigate("/");
  };


  return (
    <div className={styles.editClassContainer}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Atrás
      </button>
      <h2>Editar clase</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Instructor:</label>
          <select
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          >
            {availableInstructors.map((inst) => (
              <option key={inst.ci} value={inst.name}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Turno:</label>
          <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            required
          >
            <option value="9:00-11:00">9:00-11:00</option>
            <option value="12:00-14:00">12:00-14:00</option>
            <option value="16:00-18:00">16:00-18:00</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Alumnos:</label>
          {students.map((student) => (
            <div key={student.ci}>
              <label>
                <input
                  type="checkbox"
                  checked={studentsInClass.includes(student.ci)}
                  onChange={() => handleStudentChange(student.ci)}
                />
                {student.name}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className={styles.submitButton}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

// Validación de props
EditClass.propTypes = {
  classes: PropTypes.array.isRequired,
  onUpdateClass: PropTypes.func.isRequired,
  instructors: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
};
export default EditClass;
