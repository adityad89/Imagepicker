import React from "react";
import { Card, CardActionArea, CardContent, Button } from "@material-ui/core";

import { useForm } from "react-hook-form";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

import blue from "@material-ui/core/colors/blue";

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  icon: {
    margin: theme.spacing(2)
  },
  cardContainer:{
    width: "100px",
    margin: "10px",
  },
  cardRoot: {
    paddingBottom: "14px !important"
  },
  cardRootHide: {
    paddingBottom: "14px !important",
    margin: "-16px"
  },
  input: {
    display: "none"
  },
  button: {
    color: blue[900],
    margin: 10
  },
  logo: {
    width: "100px",
    height: "100px"
  },
  submit: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "120px",
  }
}));

export default function App() {
  const classes = useStyles();
  const { register,handleSubmit,reset } = useForm();
  const [uploadState, setUploadState] = React.useState("initial");
  const [image, setImage] = React.useState("");

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setImage(reader.result);
        setUploadState("uploaded");
      };
    }
  };

  const handleResetClick = (event) => {
    setImage(null);
    setUploadState("initial");
    reset({ logo: null });
  };

  const onUpload = (data) => {
    console.log(data.logo[0])
  }

  return (
    <div className={classes.root}>
      <Card className={classes.cardContainer}>
        <CardContent
          className={
            uploadState !== "uploaded" ? classes.cardRoot : classes.cardRootHide
          }
        >
          <Grid container justify="center" alignItems="center">
            <input
              accept="image/jpeg,image/png,image/tiff,image/webp"
              className={classes.input}
              id="contained-button-file"
              name="logo"
              ref={register({required:true})}
              type="file"
              onChange={handleUploadClick}
            />
            <label
              htmlFor="contained-button-file"
              className={uploadState === "uploaded" ? classes.input : null}
            >
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
          </Grid>
        </CardContent>
        {uploadState === "uploaded" && (
          <CardActionArea onClick={handleResetClick}>
            <img className={classes.logo} src={image} alt="LOGO" />
          </CardActionArea>
        )}
      </Card>
      <Button variant="contained" 
      color="primary" 
      className={classes.submit}
      onClick={handleSubmit(onUpload)}>
        Upload
      </Button>
    </div>
  );
}
