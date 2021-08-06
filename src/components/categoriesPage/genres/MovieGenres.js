import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../redux/actions/actionsTypes";

const genreArr = [
  [".", "Tum Filmler"],
  ["Family", "Aile"],
  ["Action", "Aksiyon"],
  ["Animation", "Animasyon"],
  ["Anime", "Anime"],
  ["Documentary", "Belgesel"],
  ["Sci-Fi", "Bilim Kurgu"],
  ["Biography", "Biyografi"],
  ["Drama", "Dram"],
  ["Fantastic", "Fantastik"],
  ["Thriller", "Gerilim"],
  ["Mystery", "Gizem"],
  ["Comedy", "Komedi"],
  ["Horror", "Korku"],
  ["Adventure", "Macera"],
  ["Musical", "Müzikal"],
  ["Whodunit", "Polisiye"],
  ["Romance", "Romantik"],
  ["War", "Savaş"],
  ["Sport", "Spor"],
  ["Crime", "Suç"],
  ["History", "Tarih"],
  ["Western", "Western"],
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "92vh",
    maxWidth: 360,
    backgroundColor: "#495057",
    marginTop:'2em',
    color: "white",
    marginLeft:'5em',
  },
}));
const SimpleList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentCategory = (item) => {
    dispatch({ type: actionTypes.CURRENT_CATEGORY, payload: item });
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {genreArr.map((item) => (
          <ListItem
            style={{ height: "30px", width: "100%" }}
            key={item}
            button
            onClick={() => currentCategory(item)}
          >
            {" "}
            <hr></hr>
            <ListItemIcon>
              <ArrowForwardIosIcon />
            </ListItemIcon>
            <ListItemText primary={item[1]} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SimpleList;
