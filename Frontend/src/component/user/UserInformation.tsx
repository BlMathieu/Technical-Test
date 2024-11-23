import { useSelector } from 'react-redux';
import "./UserInformation.css";
function UserInformation() {
    const user = useSelector(state => state.jwtReducer.user);
    const status = useSelector(state => state.jwtReducer.access_token);
    const getStatus = () => {
        if (user != null && status != null) {
            return (
                <>
                    <p>Status : Connecté !</p>
                    <p>Nom d'utilisateur : {user.login}</p>
                </>);
        } else {
            return (<p>Status : Déconnecté !</p>);
        }
    }
    return (
        <>
            <footer>
                {getStatus()}
            </footer>
        </>
    );
}

export default UserInformation;