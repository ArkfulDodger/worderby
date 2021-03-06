import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../../App";
import GText from "../tools/GText";
import PButton from "../tools/PButton";
import LinearGradient from "react-native-linear-gradient";

const FriendCard = ({ friend: { item: friend }, refresh }) => {
  const [isThinking, setIsThinking] = useState(false);
  const URL = useContext(UrlContext);
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);

  const game = friend.current_games.find(
    (game) => game.player1.id === user.id || game.player2.id === user.id
  );

  const actionText = game
    ? game.is_accepted
      ? "Continue"
      : game.challenger_id === user.id
      ? "Cancel"
      : "Accept"
    : "Start New";

  const continueGame = () => {
    console.log("continuing game");
    setIsThinking(true);

    fetch(URL + `/games/${game.id}`)
      .then((res) => res.json())
      .then((gameData) => {
        setIsThinking(false);
        navigation.navigate("Game", { gameData: gameData });
      })
      .catch((error) => console.log(error.message));
  };

  const cancelChallenge = () => {
    console.log("cancelling challenge");
    setIsThinking(true);

    fetch(URL + `/games/${game.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        setIsThinking(false);
        res.ok ? refresh() : alert("something went wrong");
      })
      .catch((error) => alert(error.message));
  };

  const acceptChallenge = () => {
    console.log("accepting challenge");
    setIsThinking(true);

    fetch(URL + `/games/${game.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        is_accepted: true,
      }),
    })
      .then((res) => res.json())
      .then((updatedGame) => {
        setIsThinking(false);
        navigation.navigate("Game", { gameData: updatedGame });
      })
      .catch((error) => console.log(error.message));
  };

  const issueChallenge = () => {
    setIsThinking(true);

    fetch(URL + "/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        player1_id: friend.id,
        player2_id: user.id,
        is_over: false,
        num_rounds: 3,
        round: 1,
        turn: 1,
        player1_score: 0,
        player2_score: 0,
        is_single_player: false,
        is_accepted: false,
        challenger_id: user.id,
        challengee_id: friend.id,
        streak: 1,
      }),
    })
      .then((res) => res.json())
      .then((newGameData) => {
        setIsThinking(false);
        refresh();
      })
      .catch((error) => console.log(error.message));
  };

  const buttonAction = game
    ? game.is_accepted
      ? () => continueGame()
      : game.challenger_id === user.id
      ? () => cancelChallenge()
      : () => acceptChallenge()
    : () => issueChallenge();

  // const isOdd = (num) => !!(num % 2);
  // const isPlayerTurn =
  //   (game.player1.id === user.id && isOdd(game.turn)) ||
  //   (game.player2.id === user.id && !isOdd(game.turn));

  // const opponent = game.player1.id === user.id ? game.player2 : game.player1;

  // const isReadyToContinue = game.is_word_played_this_turn;

  // const buttonText = !game.is_accepted
  //   ? game.challengee_id === user.id
  //     ? "Accept"
  //     : "Cancel"
  //   : "Play";

  // function isWordPlayedThisRound() {
  //   const round = game.round;
  //   const turn = game.turn;
  //   const wordThisRound = game.words.find(
  //     (word) => word.round_played === round && word.turn_played === turn
  //   );

  //   return !!wordThisRound;
  // }

  // const acceptChallenge = () => {
  //   console.log("accept challenge fired");
  //   console.log("game:", game);
  //   console.log("game id:", game.id);

  //   fetch(URL + `/games/${game.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       is_accepted: true,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((updatedGame) => {
  //       console.log("updatedGame:", updatedGame);
  //       navigation.navigate("Game", { gameData: updatedGame });
  //     })
  //     .catch((error) => console.log(error.message));
  // };

  // const cancelChallenge = () => {
  //   console.log("cancelling challenge");

  //   fetch(URL + `/games/${game.id}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => {
  //       res.ok ? refresh() : alert("something went wrong");
  //     })
  //     .catch((error) => alert(error.message));
  // };

  // const getGame = () => {
  //   fetch(URL + `/games/${game.id}`)
  //     .then((res) => res.json())
  //     .then((gameData) => {
  //       console.log("got game data");
  //       navigation.navigate("Game", { gameData: gameData });
  //     })
  //     .catch((error) => console.log(error.message));
  // };

  // const onGamePress = () => {
  //   !game.is_accepted
  //     ? game.challengee_id === user.id
  //       ? acceptChallenge()
  //       : cancelChallenge()
  //     : getGame();
  //   // TODO: set buttons not pressable here
  // };

  return (
    <LinearGradient
      colors={["#FFF6F0", "#FFD9BE"]}
      // colors={["#FFF6F0", color]}
      style={{ borderWidth: 2, borderRadius: 10, margin: 5, padding: 5 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FFFFFF88",
          padding: 5,
          borderRadius: 5,
        }}
      >
        <View style={{ flex: 1 }}>
          <GText style={{ fontWeight: "bold", fontSize: 20 }}>
            {friend.username}
          </GText>
        </View>
        {}
        <View
          style={{
            width: 150,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isThinking ? (
            <ActivityIndicator />
          ) : (
            <PButton
              onPress={buttonAction}
              style={{
                width: 120,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
              color1="#FFFFFF55"
              color2="#FFF4EB"
            >
              {actionText}
            </PButton>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default FriendCard;
