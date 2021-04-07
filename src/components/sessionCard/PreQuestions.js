import React, {useEffect, useState} from "react";
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import PreQuestionNav from './PreQuestionNav'
import MypageNav from '../mypage/MypageNav'
import getQuestionlist from "../../actions/QuestionListActions";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Box from "@material-ui/core/Box";

import { Progress, Badge, Divider } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import Moment from "react-moment";
import "../../styles/style.css";
import "../../App.css";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      maxWidth: "70em",
      minWidth: "18em"
    },
    paper: {
      padding: theme.spacing(2),
    },
    avatar : {
      width: theme.spacing(7),
      height: theme.spacing(7),
      transform: "translate(0.35em,-3.35em)"
      // opacity: 0.7,
    },
    title : {
      paddingLeft: "1em",
      fontFamily: "NanumGothic",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "1.1em",
      paddingTop: "0.8em",
      paddingBottom: "1em",
    },
    time : {
      paddingLeft: "1em",
      paddingBottom: "1em",
      fontFamily: "NanumGothic",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "1em",
    },
    desc : {
      paddingLeft: "1em",
      paddingBottom: "1em",
      fontFamily: "NanumGothic",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "1em",
    }

  }));



const SessionDetail = ({session}) => {
  const history = useHistory();
    const classes = useStyles();

    if(session === undefined){
      return(
        <>
        로딩중
        </>
      )
    }
    return(
        <>
        <Grid container spacing={0}>
        <Grid item xs={8}>
        <p className={classes.title}>{session.title}</p>
        </Grid>
        <Grid item xs={4}>
        <Progress 
          className={classes.progress}
          strokeWidth="5"
          type="dashboard"
          strokeColor="#F24822"
          gapDegree = "85"
          width={70}
          format={percent => {
            if(percent == 100){
              return(
                <>
                  <Avatar className={classes.avatar} src={`https://www.ask2live.me${session.host_profile_image}`} />
                </>
              )
            }else{
              return(
                <>
                  <Avatar className={classes.avatar} src={`https://www.ask2live.me${session.host_profile_image}`} />
                </>
              )}
            
            }}
          percent={(session.hole_reservations) ? 
                  Math.ceil(
                    session.hole_reservations.guests.length / session.hole_reservations.target_demand <= 1 ?
                    session.hole_reservations.guests.length / session.hole_reservations.target_demand * 100 : 100) : 0}/>
        </Grid>
        <div>
        <div className={classes.time}>라이브 예정 일자 : {``}
          <Moment format="MM.DD hh시 mm분">
                {session.reserve_date}
          </Moment></div>
        </div>
        <div>
        <div className={classes.desc}>라이브 주제 : {``} {session.description}</div>
        </div>
        </Grid>

        </>
    )
}

const ListPreQuestions = ({questions, session}) => {
    console.log('qestions', questions)
    return(
        <>
        <PreQuestionNav session={session}/>
        
        </>
    )
}

const PreQuestions = () => {
    const dispatch = useDispatch()
    const questions = useSelector(state => state.questionlist)
    const sessions = useSelector(state => state.session.data)
    let targetSession = {};

    const href = window.location.href
    const sessionId = parseInt(href.split('/')[4])

    if(Object.keys(sessions).length != 0){
        sessions.map((session) => {
          console.log('DEBUG22',session)
            if(sessionId === session.id){
                targetSession = {...targetSession, session}
            }
        })
      }
    useEffect(() => {
      if(Object.keys(questions.data).length === 0){
        dispatch(getQuestionlist(sessionId))
      }
    })
    
    return (
            <>
        <MypageNav text={'Live Q&A 상세'} />
        {/* <div style={{position : "absolute", height:"12em", width: "100%", backgroundColor:"skyblue"}}>{""}</div> */}
        <div style={{display:"flex", justifyContent:"center", position:"absolute", top:"9%" , width:"100%"}}>
          <div style={{width:"100%", maxWidth:"50em"}}>
          <SessionDetail session={targetSession.session}/>
          {Object.keys(questions.data).length > 0 ? <ListPreQuestions questions={questions} session={targetSession.session}/> : null}
          </div>
        </div>
        </>
    )
  
}
export default PreQuestions;