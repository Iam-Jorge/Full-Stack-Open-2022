
const Header = ({name}) => {
    return <h2>{name}</h2>
};

const Content = ({content}) => {
    return (
        <div>
            {content.map((part) => 
            <Part key={part.id} name={part.name} exercises={part.exercises}></Part>)}
        </div>
    )
}

const Part = ({name, exercises}) => {
    return (
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
}

const Total = ({part}) => {
    const total = part.reduce((sum, part) => sum + part.exercises, 0);    
    return (
        <div>
            <strong>Total of {total} exercises</strong>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name}></Header>
            <Content content={course.parts}></Content>
            <Total part={course.parts}></Total>
        </div>
    );
};

export default Course;