import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { SettingsInputAntenna } from "@material-ui/icons";

import "../../styles/style.css";

import axios from "axios";
import MypageNav from "./MypageNav";
import { getUserInfo, updateUserInfo } from "../../actions/UserActions";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "95%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF5941",
    maxWidth: "50em",
    margin: "auto",
  },
  root2: {
    position: "absolute",
    top: "10%",
    left: 0,
    right: 0,
    margin: "auto",
    height: "95.3%",
    width: "88%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "15px 15px 0 0",
    boxShadow: "2px 1px 5px 3px rgba(0,0,0, 0.7)",
    maxWidth: "70em",
  },
  avatar: {
    position: "absolute",
    top: "8%",
    right: "5%",
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  username: {
    position: "absolute",
    fontFamily: "BMDOHYEON",
    fontSize: "1.3em",
    top: "9%",
    left: "5%",
    // top: "12%",
    // left: "6.6%",
    maxWidth: "6em",
  },
  work_company: {
    position: "absolute",
    fontFamily: "BMJUA",
    top: "28%",
    left: "5%",
  },
  work_field: {
    position: "absolute",
    fontFamily: "BMJUA",
    top: "34%",
    left: "5%",
    color: "grey",
  },
  bio: {
    position: "absolute",
    transform: "translate(0, -3em)",
    fontFamily: "BMJUA",
    // top: "50%",
    left: "5%",
  },
}));

const style = {
  buttonGroup: {
    position: "absolute",
    display: "flex",
    left: 0,
    right: 0,
    bottom: "5.5%",
    margin: "auto",
    justifyContent: "center",
  },
  file: {
    fontFamily: "BMJUA",
    // fontWeight: "bold",
    position: "absolute",
    top: "23%",
    left: "5%",
    overflow: "hidden",
  },
  button: {
    position: "relative",
    fontFamily: "BMDOHYEON",
    fontWeight: "lighter",
    padding: "1px",
    width: "40%",
    maxWidth: "25em",
    margin: "auto 2%",
    color: "#EF5941",
    borderColor: "#EF5941",
  },
  button2: {
    position: "relative",
    fontFamily: "BMDOHYEON",
    padding: "1px",
    width: "40%",
    maxWidth: "25em",
    margin: "auto 2%",
    backgroundColor: "#EF5941",
    opacity: "0.9",
  },
};

const MypageEdit = (props) => {
  console.log("MypageEdit");

  const classes = useStyles();
  const history = useHistory();
  const user = props.routerInfo.location.state;

  console.log(user);
  
  const [username, setUsername] = useState(user.username);
  console.log(username);
  const [profileImage, setProfileImage] = useState("https://www.ask2live.me" + user.profile_image)
  const [workField, setWorkField] = useState(user.work_field);
  const [workCompany, setWorkCompany] = useState(user.work_company);
  const [bio, setBio] = useState(user.bio);
  const [usernameValid, setUsernameValid] = useState(false);

  // useEffect(() => {
  //   setUsername(user.username);
  // }, [])
  const [image, setImage] = useState({});
  // const [inputs, setInputs] = useState({
    // username: user.username,
  //   profile_image: "https://www.ask2live.me" + user.profile_image,
  //   work_field: user.work_field,
  //   work_company: user.work_company,
  //   bio: user.bio,
  // });

  // const {  profile_image, work_field, work_company, bio } = inputs;

  const dispatch = useDispatch();
  const onChange = useCallback((e) => {
    console.log("e.target.name",e.target.name)
    if(e.target.name === "image"){
      if(e.target.files[0].size > 6000000){
        alert("6MB 이상의 파일은 업로드되지 않습니다.")
      }else{
        setImage({
          profile_image: e.target.files,
        });
        console.log("e.target.files",e.target.files);
      }  
    }
    // else{
    //   const { name, value } = e.target;
    //   setInputs({
    //     ...inputs,
    //     [name]: value,
    //   });
    // }
  });

  const onClick = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Token " + localStorage.token,
      },
    };
    const data = {
      work_field: workField,
      username: username,
      work_company: workCompany,
      bio: bio.replace("\r\n", "<br/>"),
    };
    console.log("data", data);
    const formData = new FormData();
    formData.append("work_field", data.work_field);
    formData.append("username", data.username);
    formData.append("work_company", data.work_company);
    formData.append("bio", data.bio);

    console.log(image);
    if (Object.keys(image).length != 0) {
      formData.append("profile_image", image.profile_image[0]);
    }

    console.log("====DATA====", formData);
    const resPatch = await axios.patch(
      "https://www.ask2live.me/api/user/update",
      formData,
      config
    );
    console.log("업데이트 성공~", resPatch.data);
    dispatch(getUserInfo(localStorage.token));
    const resGet = await axios.get(
      "https://www.ask2live.me/api/user/read",
      config
    );
    console.log("업데이트 유저 불러오기", resGet);
    console.log("====DATA====", formData);
    
    history.replace({
      pathname: "/mypage/" + username,
      state: resGet.data.detail,
    });
  };

  return (
    <>
      <MypageNav text={"프로필 편집"} />
      <div className={classes.root}>
        <div className={classes.root2}>
          <div>
            <p className={classes.username}>
              <input
                // className={classes.username}
                className="BMDOHYEON"
                style={{
                  fontSize: "1em",
                  maxWidth: "8em",
                  border: "none",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "5px",
                }}
                required
                autoComplete="off"
                oninvalid={usernameValid}
                defaultValue={username}
                value={username}
                placeholder="이름을 입력하세요"
                name="username"
                onChange={(e) => {
                  if (e.target.value.length > 6)
                    alert("이름은 6글자 이내로 입력이 가능합니다!");
                  setUsername(e.target.value.substring(0, 6));
                  setUsernameValid(false)
                }}
              />
            </p>

            <Avatar
              className={classes.avatar}
              aria-label="recipe"
              src={profileImage}
            ></Avatar>
            <input
              style={style.file}
              type="file"
              name="image"
              // accept="image/*"
              onChange={onChange}
            />
          </div>

          <p className={classes.work_company}>
            <input
              // className={classes.work_company}
              style={{
                fontSize: "1em",
                border: "none",
                fontFamily: "BMJUA",
                // borderBottom: "1px solid",
                // backgroundColor: "#FFEBE8",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "5px",
              }}
              defaultValue={workCompany}
              value={workCompany}
              placeholder="회사 이름을 입력해주세요"
              name="work_company"
              onChange={(e) => setWorkCompany(e.target.value)}
            />
          </p>
          <p className={classes.work_field}>
            <input
              // className={classes.work_field}
              style={{
                fontSize: "1em",
                border: "none",
                fontFamily: "BMJUA",
                color: "grey",
                // backgroundColor: "#FFEBE8",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "5px",
              }}
              defaultValue={workField}
              value={workField}
              placeholder="일하는 분야를 입력해주세요"
              name="work_field"
              onChange={(e) => setWorkField(e.target.value)}
            />
          </p>

          <div
            style={{
              position: "absolute",
              top: "54%",
              width: "100%",
              height: "40.5%",
            }}
          >
            <p className={classes.bio}>
              [소개]
              <br />
            </p>
            <div className="bioWrapper">
              {/* <p style={{marginTop: 0}}> */}
              <textarea
                className="bioWrapper"
                style={{
                  border: "1px solid",
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  width: "89%",
                  height: "80%",
                  // backgroundColor: "#F2AC57",
                  fontFamily: "BMJUA",
                  // backgroundColor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "5px",
                }}
                defaultValue={bio}
                value={bio}
                placeholder="소개를 입력해주세요"
                name="bio"
                onChange={(e)=> setBio(e.target.value)}
                // onKeyPress={pressEnter}
              />
              {/* </p> */}
            </div>
          </div>

          <div style={style.buttonGroup}>
            <Button
              style={style.button}
              variant="outlined"
              // color="#EF5941"
              size="normal"
              onClick={() => {
                history.goBack();
              }}
            >
              <span style={{transform: "translate(0, 1px)", color: "#EF5941"}}>
                취소하기
              </span>
            </Button>

            <Button
              style={style.button2}
              variant="contained"
              // color="primary"
              // backgroundColor="#EF5941"
              // backgroundColor='#0063cc'
              size="large"
              onClick={onClick}
            >
              <span style={{transform: "translate(0, 1px)", color: "#FFFFFF"}}>
                확정하기
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MypageEdit;
