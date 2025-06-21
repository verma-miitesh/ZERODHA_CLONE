import React from "react";
function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>Extend your trading and investment experience even further with our
        partner platforms</p>
        <div className="col-4 p-3">
          <img src="Media/images/smallcaseLogo.png" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3">
          <img src="Media/images/streakLogo.png" style={{width:"40%"}}/>
          <p className="text-small text-muted">Algo &nbsp; strategy platform</p>
        </div>
        <div className="col-4 p-3">
          <img src="Media/images/sensibullLogo.svg" style={{width:"60%"}}/>
          <p className="text-small text-muted">Options trading platforms</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="Media/images/zerodhaFundhouse.png" style={{width:"50%"}}/>
          <p className="text-small text-muted">Assest management</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="Media/images/goldenpiLogo.png" />
          <p className="text-small text-muted">Bonds trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="Media/images/dittoLogo.png" style={{width:"30%"}}/>
          <p className="text-small text-muted">Insurance</p>
        </div><br/>
        <button className='p-2 btn btn-primary fs-5' style={{width:"20%", margin:"0 auto"}}>Signup Now</button>
      </div>
    </div>
  );
}

export default Universe;
