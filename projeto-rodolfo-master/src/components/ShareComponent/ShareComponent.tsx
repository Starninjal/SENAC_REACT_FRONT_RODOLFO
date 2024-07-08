/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { consultaAcaoPorCodigo } from "../../services/ShareAPI";
import { ShareRequestProps } from "../../interfaces/ShareRequestProps";
import './ShareComponent.css'


const ShareComponent: React.FC<ShareRequestProps> = ({ symbol }) => {
    const [share, setShareData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean | null>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        consultaAcaoPorCodigo (symbol)
        .then((response) => {
          setShareData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, [symbol]);
    if (loading) return <div> Loading ...</div>;
    if (error) return <div> Error: {error}</div>;
  
    return (
      <>
    <div className="d-flex justify-content-center">
    <div className="card">
    <img src={share?.logourl} className="card-img-top" alt="Imagem da Moeda" />
      <div className="card-body">
        <h5 className="card-title alert alert-warning">{share?.currency}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{share?.shortName}</h6>
      </div>
      <div className="card-body d-flex flex-column align-center">
        <div className="text">
          <h4>Regular Market Change</h4>
        <p>{share?.regularMarketChange}</p>
        </div>

        <div className="text">
          <h4>Regular Market Day High</h4>
        <p>{share?.regularMarketDayHigh}</p>
        </div>

        <div className="text">
          <h4>Regular Market Day Low</h4>
        <p>{share?.regularMarketDayLow}</p>
        </div>
      </div>
    </div>
    </div>
      </>
    );
  };
  
  export default ShareComponent;
  