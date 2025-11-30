
import TablePagination from "@material-ui/core/TablePagination";

 const [rowsPerPage, setRowsPerPage] = useState(10);
 const [page, setPage] = useState(0);
 const fethcStudents = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`applicant/list/?limit=${rowsPerPage}`);
       ;
      const { status, data } = res;
      const { results, count,amount ,next } = data;
      if (status === 200) {
        setStudents(results);
        setAmount(amount)
        setCount(count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handlePageChange = async(e, newPage) => {
    setPage(newPage);
    setLoading(true)
     try {
        const res = await Axios.get(`/applicant/list/?limit=${rowsPerPage}&offset=${newPage*rowsPerPage}`);
        const { status, data } = res;
        const { results } = data;
        if (status == 200) {
          setStudents(results);
        }
         ;
        setLoading(false)
      } catch (error) {
         ;
        setLoading(false)
      }
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    }
    useEffect(() => {
        fethcStudents();
      }, [rowsPerPage]);
      <TablePagination
      rowsPerPageOptions={[20,40,60]}
      component="table"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleChangeRowsPerPage}
  />