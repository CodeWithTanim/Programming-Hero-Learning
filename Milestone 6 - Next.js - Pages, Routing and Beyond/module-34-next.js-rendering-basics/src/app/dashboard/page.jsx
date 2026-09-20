import Counter from "../components/Counter";


const DashboardPage = () => {
    console.log('Dashboard Page RenderError')
    return (
        <div>
            <h2>Dashboard Page</h2>
            <Counter/>
            <ul>
                <li>Dashboard Item 1</li>
                <li>Dashboard Item 2</li>
                <li>Dashboard Item 3</li>
            </ul>
        </div>
    );
};

export default DashboardPage;