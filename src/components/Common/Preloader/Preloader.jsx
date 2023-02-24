import preloader from "../../../assets/images/proloader.gif";

const Preloader = (props) => {
    return (
        <div style={ {backgroundColor: "white"} }>
            <img src={preloader}/>
        </div>
    )
}
export default Preloader