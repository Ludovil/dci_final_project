import { useLocation } from 'react-router-dom';

function Profile() {
  //states

  const location = useLocation();

  return (
    <div>
      <h1>{location?.state?.userName}</h1>
    </div>
  );
}

export default Profile;
