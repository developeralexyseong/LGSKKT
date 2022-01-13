import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useLocation } from 'react-router-dom';
// import Typography from "@material-ui/core/Typography"
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import makeStyles from '@material-ui/core/styles/makeStyles';

import { getBoardList } from '../modules/board';
import { Board } from '../model/board';
import config from '../config';
import { useAppSelector } from '../hooks';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 1.5, 0, 1.5),
  },
}));

function useParameter() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function BoardContent() {
  const classes = useStyles();
  const contentIdx = new URLSearchParams(window.location.search).get('num');
  const [content, setContent] = useState<Board | null>(null);
  const boardList = useAppSelector(getBoardList);

  async function loadContent() {

    if (!content && contentIdx && !isNaN(parseInt(contentIdx))) {
      const dataNum = parseInt(contentIdx);
      const board = boardList.find((element) => element.num === dataNum);
      if (board) {
        setContent(board);
      }
    }
  }

  useEffect(() => {
    loadContent();
  }, [content, contentIdx]);

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <form className={classes.form} noValidate method="post">
          <Box
            border="1px solid #dfdfdf"
            borderRadius="10px"
            textAlign="left"
            padding="5px"
          >
            {content?.title}
          </Box>
          <Box display="flex" flexDirection="row">
            <Box
              border="1px solid #dfdfdf"
              borderRadius="10px"
              textAlign="left"
              width="80%"
              height="250px"
              padding="5px"
              marginTop="10px"
            >
              {content?.content}
            </Box>
            <Box m={1} />
            <Box
              border="1px solid #dfdfdf"
              borderRadius="10px"
              textAlign="left"
              width="20%"
              height="250px"
              padding="5px"
              marginTop="10px"
            >
              {content?.imageFile && (
                <img
                  src={config.apiServer + '/uploads/' + content.imageFile}
                  alt=" "
                  width="100%"
                  height="230px"
                />
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            border="1px solid #dfdfdf"
          >
            <Box width="150px">{content?.userId}</Box>
            <Box marginLeft={1} />
            <Box width="100%">
              <TextField variant="outlined" fullWidth size="small" />
            </Box>
            <Box marginLeft={1} />
            <Box width="150px">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                보내기
              </Button>
            </Box>
          </Box>
          <Box m={1} />
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              수정
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              삭제
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  );
}

export default BoardContent;
