import loading from '../../../assets/loading.svg'

function Loading(props) {
    return ( 
        <div className={props.style}>
            <img className={props.styleImg} src={loading} />
        </div>
     );
}

export default Loading;