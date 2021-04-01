import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';



const style = {
    alert : {
        boxShadow: "2px 2px 2px 2px #D95032",    // ������ ��
        border: "solid 1px white",    // �׵θ� ��
        backgroundColor:"black"      // ����
    }
}


// ���� �Լ�, onClick�� �ش� �Լ� ������ Ŭ���� ����
const handleClick = () => {       
    setOpen(true);
};


// �ݴ� �Լ�. �̹� �Ʒ��� �ڵ������� ���ǰ� ����.
const handleClose = (event, reason) => { 
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
};


// �־�� �� ��
<Snackbar style={{position: "fixed", bottom:"50%"}} open={open} autoHideDuration={6000} onClose={handleClose}>
<Alert onClose={handleClose} style={style.alert} severity="success">
    <span style={{color:"white"}}>���� ��� ����!</span>
</Alert>
</Snackbar>
