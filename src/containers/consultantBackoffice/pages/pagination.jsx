import TablePagination from "@material-ui/core/TablePagination";
const [next, setNext] = useState("");
const [rowsPerPage, setRowsPerPage] = useState(10);
const [page, setPage] = useState(0);
const [count, setCount] = useState();
const [amount ,setAmount] = useState('')
const [pageChange,setPageChange] = useState()
const [prev, setPrev] = useState("");
const fetchData = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      if (status === 200) {
        const { results,amount ,count,next} = data;
        setUniverData(results);
        setAmount(amount)
        setCount(count);
        setNext(next);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handlePageChange = (e, newPage) => {
    setPageChange(page - newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = async (event) => {
     ;
     ;
    setRowsPerPage(+event.target.value);
    setPage(0);
    if(rowsPerPage - event.target.value == -20){
    if (next) {
      try {
        const res = await Axios.get(`/university/?page=${next.slice(-1)}`);
        const { status, data } = res;
        const { results, previous } = data;
        if (status == 200) {
          setStudents((prev) => [...prev, ...results]);
          setPrev(previous);
          setPage(0);
        }
         ;
      } catch (error) {
         ;
      }
    }
   } else if (rowsPerPage - event.target.value  == 20) {
      if(typeof(prev?.slice(-1)) === 'number' ){
        try {
          const res = await Axios.get(`/university/?page=${prev.slice(-1)}`);
          const { status, data } = res;
          const { results, next } = data;
          if (status == 200) {
            setStudents((prev) => [...prev, ...results]);
            setNext(next);
            setPage(0);
          }
           ;
        } catch (error) {
           ;
        }
      }else {
        fetchData()
      }
    }
  };
  <TablePagination
  rowsPerPageOptions={[20,40,60]}
  component="table"
  count={count}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handlePageChange}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>


