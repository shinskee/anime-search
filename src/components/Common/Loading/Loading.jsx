import loading from '../../../assets/loading.svg'

function Loading(props) {
    return ( 
        <div className={props.style}>
            <img src={loading} alt="" />
        </div>
     );
}

export default Loading;