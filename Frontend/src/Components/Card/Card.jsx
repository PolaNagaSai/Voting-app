import "./Card.css";

const Card = ({cName,cAge,cParty,onVote,voted}) => {
  return (
    <>
      <div className="box">
        <div className="card">
          <div className="top">
            <h2 className="name">Name:{cName}</h2>
            <img
              src="https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            ></img>
          </div>
          <div className="bottom">
            <p>Age:{cAge} </p>
            <p>Party:{cParty}</p>
            <button  className={`vote-button ${voted ? 'voted' : ''}`}
            onClick={voted ? null : onVote}
            disabled={voted}
            >
               {voted ? 'Already Voted' : 'Vote'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
