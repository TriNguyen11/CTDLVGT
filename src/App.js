import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [arrRandom, setArrRamdom] = useState([
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
  ]);
  const arr = [
    {
      number: arrRandom[0],
      top: 0,
      left: 10,
      valueNest: [arrRandom[1], arrRandom[2], arrRandom[3]],
    },
    {
      number: arrRandom[1],
      top: 100,
      left: -100,
      valueNest: [arrRandom[4], arrRandom[5], arrRandom[6]],
    },
    {
      number: arrRandom[2],
      top: 100,
      left: 0,
      valueNest: [arrRandom[7], arrRandom[8]],
    },
    {
      number: arrRandom[3],
      top: 100,
      left: 100,
      valueNest: [arrRandom[11], arrRandom[10], arrRandom[9]],
    },

    { number: arrRandom[4], top: 80, left: -250, valueNest: [] },
    { number: arrRandom[5], top: 150, left: -240, valueNest: [] },
    { number: arrRandom[6], top: 180, left: -180, valueNest: [] },

    { number: arrRandom[7], top: 250, left: -80, valueNest: [arrRandom[12]] },
    // { number: 19, top: 280, left: -20, valueNest: [] },
    { number: arrRandom[8], top: 250, left: 40, valueNest: [] },

    { number: arrRandom[11], top: 200, left: 250, valueNest: [] },
    { number: arrRandom[10], top: 120, left: 280, valueNest: [] },
    { number: arrRandom[9], top: 50, left: 250, valueNest: [] },

    { number: arrRandom[12], top: 350, left: -100, valueNest: [] },
  ];
  console.log(arrRandom, "arrRandom");
  const [arrPos, setArrPos] = useState([arr[0].number]);
  const [findNumber, setFindNumber] = useState();
  const [step, setStep] = useState(0);
  const [isFound, setIsfound] = useState(false);

  const handleDFS = async (dataPass) => {
    const a = arr.filter((item) => {
      if (item.number === dataPass) {
        return item.valueNest;
      }
    });
    return a[0].valueNest;
  };
  useEffect(() => {
    if (arrPos.length === 0) {
      alert(`Không tìm thấy số ${findNumber} trong mảng`);
      setStep(0);

      setArrPos([arr[0].number]);
    }
    if (arrPos[0] === findNumber) {
      setTimeout(() => {
        setIsfound(true);
        setStep(0);

        alert(
          ` Đã tìm thấy số ${findNumber.toString()} sau ${step.toString()} bước`
        );
      }, 200);
      // setArrPos([arr[0].number]);
    }
  }, [arrPos]);
  useEffect(() => {
    if (arrPos[0] === findNumber) {
      setTimeout(() => {
        setIsfound(true);
        alert(
          ` Đã tìm thấy số ${findNumber.toString()}  sau  ${step.toString()} bước`
        );
      }, 200);
    }
  }, [findNumber]);
  // console.log(typeof findNumber, "arrPos");
  return (
    <div className="App">
      <header
        className=""
        style={
          {
            // backgroundColor: "blueviolet",
          }
        }>
        <h1
          style={{
            marginBottom: 50,
          }}>
          Depth first search
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100vw",
            height: "auto",
            position: "relative",
            alignItems: "center",
            padding: "50px 0",
          }}>
          <svg
            height={"100vh"}
            width="100vw"
            style={{
              position: "absolute",
              top: 0,
              zIndex: -1,
              backgroundColor: "antiquewhite",
              // paddingTop: 100,
            }}>
            {arr.map((item, index) => {
              return arr.map((itemChild, key) => {
                if (item.valueNest.includes(itemChild.number))
                  return (
                    <line
                      x1={`${window.innerWidth / 2 + 30 + item.left}`}
                      y1={`${item.top + 70}`}
                      x2={`${window.innerWidth / 2 + 40 + itemChild.left}`}
                      y2={`${itemChild.top + 70}`}
                      // style="stroke:rgb(255,0,0);stroke-width:2"
                      // color="white"
                      style={{ stroke: "rgb(255,0,0)", strokeWidth: 2 }}
                      strokeWidth={1}></line>
                  );
              });
            })}
          </svg>
          <div style={{ position: "relative", height: "50vh" }}>
            {arr.map((item, index) => {
              return <NumberRender data={item} arrPos={arrPos} />;
              // return (
              //   <div
              //     style={{
              //       backgroundColor: "red",
              //       padding: 20,
              //       borderRadius: "50%",
              //       width: 40,
              //       height: 40,
              //       display: "flex",
              //       justifyContent: "center",
              //       alignItems: "center",
              //       position: "absolute",
              //       top: item.top,
              //       left: item.left,
              //     }}>
              //     {item.number}
              //   </div>
              // );
            })}
          </div>
        </div>
      </header>
      <div style={{ marginBottom: 20 }}>Mảng hiện tại: {arrPos.toString()}</div>
      <div>
        Nhập số cần tìm:
        <input
          style={{ marginLeft: 20, padding: "5px 12px" }}
          onChange={(e) => {
            setFindNumber(Number(e.target.value));
          }}></input>
      </div>

      {/* <button
        style={{
          marginTop: 20,
          fontSize: 16,
          padding: "5px 10px",
          borderRadius: 12,
        }}
        onClick={async () => {
          setArrRamdom(
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100)
          );
        }}>
        Đổi số khác
      </button> */}
      <button
        style={{
          marginTop: 20,
          fontSize: 16,
          padding: "5px 10px",
          borderRadius: 12,
          marginRight: 10,
        }}
        onClick={async () => {
          const arrRandom = [
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
            Math.round(Math.random() * 1000),
          ];
          setArrRamdom(arrRandom);
          setIsfound(false);
          setStep(0);
          setArrPos([arrRandom[0]]);
        }}>
        New Number
      </button>
      <button
        style={{
          marginTop: 20,
          fontSize: 16,
          padding: "5px 10px",
          borderRadius: 12,
        }}
        onClick={async () => {
          if (isFound) {
            setIsfound(false);
            setStep(0);
            setArrPos([arr[0].number]);

            return;
          }
          let arrTemp = [...arrPos];
          const nextArr = await handleDFS(arrPos[0]);
          setStep((step) => step + 1);
          arrTemp[0] = [...nextArr];

          setArrPos(arrTemp.flat(1));
        }}>
        next
      </button>
    </div>
  );
}
const NumberRender = ({ data, arrPos }) => {
  return (
    <div
      style={{
        backgroundColor: arrPos.includes(data.number) ? "black" : "white",
        color: arrPos.includes(data.number) ? "white" : "black",
        padding: 20,
        borderRadius: "50%",
        width: 20,
        height: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: data.top,
        left: data.left,
        fontSize: 16,
      }}>
      {data.number}
      {/* {data.valueNest.map((item, indexChild) => {
        return (
          <NumberChildren
            dataChild={{ ...data, number: data.valueNest[indexChild] }}
            index={indexChild}
          />
        );
      })} */}
    </div>
  );
};
// const NumberChildren = ({ dataChild, index }) => {
//   console.log(dataChild, "data");
//   return (
//     <div
//       style={{
//         backgroundColor: "red",
//         padding: 20,
//         borderRadius: "50%",
//         width: 40,
//         height: 40,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "absolute",
//         top: dataChild.top + 100,
//         left: dataChild.left - index * 100,
//       }}>
//       {dataChild.number}
//       {/* <Number data={{ top: 12, left: 12 }}></Number> */}
//     </div>
//   );
// };
export default App;
