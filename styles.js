import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },
  fiberContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 20,
  },
  projectContainer: {
    borderRadius: 20,
    width: 175,
    height: 100,
    marginTop: 30,
    marginLeft: 15,
    padding: 10,
    backgroundColor: "#9DC9BD",
    alignItems: "center",
    shadowColor: "#98B0A9",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  form: {
    margin: 10,
  },

  rowContainer: {
    flexDirection: "row",
    margin: 40,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  circleView: {
    width: 75,
    height: 75,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DC9BD",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addContainer: {
    width: 40,
    height: 40,
    borderRadius: 75,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  modalView: {
    margin: 100,
    backgroundColor: "#9DC9BD",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#98B0A9",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addText: {
    alignSelf: "center",
    fontSize: 35,
    fontWeight: "900",
    fontFamily: "Hiragino Mincho ProN",
  },
  titleText: {
    fontSize: 30,
    fontFamily: "Hiragino Mincho ProN",
    lineHeight: 33,
  },
  labelText: {
    fontSize: 20,
    fontFamily: "Hiragino Mincho ProN",
    marginTop: 10,
    lineHeight: 22,
  },
  mediumText: {
    marginTop: 40,
    marginRight: 10,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Hiragino Mincho ProN",
    lineHeight: 22,
  },
  inputText: {
    borderWidth: 1,
    width: 300,
    height: 50,
    padding: 10,
    marginTop: 10,
    fontSize: 15,
  },
  inputNotes: {
    borderWidth: 1,
    borderRadius: 20,
    width: 300,
    height: 200,
    padding: 20,
    paddingTop: 20,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 12,
    fontSize: 20,
    textAlignVertical: "center",
  },
  symbolText: {
    fontSize: 30,
    fontFamily: "Hiragino Mincho ProN",
    alignSelf: "flex-end",
  },
  headingText: {
    fontSize: 30,
    padding: 5,
    fontWeight: "bold",
    margin: 4,
    fontFamily: "Hiragino Mincho ProN",
    alignSelf: "flex-end",
    textAlign: "right",
    textDecorationLine: "underline",
    lineHeight: 35,
    color: "#4E4637",
  },
  button: {
    width: 150,
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#9DC9BD",
    marginBottom: 30,
    shadowColor: "#98B0A9",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    width: 30,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#BBB9B9",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  projectImage: {
    borderColor: "#4E4637",
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
});
export default styles;
