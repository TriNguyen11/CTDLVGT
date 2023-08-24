import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const arr = [
  { number: 2, top: 0, left: 10, valueNest: [12, 62, 23] },
  { number: 12, top: 100, left: -100, valueNest: [612, 888, 574] },
  { number: 62, top: 100, left: 0, valueNest: [11, 201] },
  { number: 23, top: 100, left: 100, valueNest: [147, 600, 302] },

  { number: 612, top: 80, left: -250, valueNest: [] },
  { number: 888, top: 150, left: -240, valueNest: [] },
  { number: 574, top: 180, left: -180, valueNest: [] },

  { number: 11, top: 250, left: -80, valueNest: [145] },
  // { number: 19, top: 280, left: -20, valueNest: [] },
  { number: 201, top: 250, left: 40, valueNest: [] },

  { number: 147, top: 200, left: 250, valueNest: [] },
  { number: 600, top: 120, left: 280, valueNest: [] },
  { number: 302, top: 50, left: 250, valueNest: [] },

  { number: 145, top: 350, left: -100, valueNest: [] },
];
function App() {
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
      setArrPos([arr[0].number]);
    }
    if (arrPos[0] === findNumber) {
      setTimeout(() => {
        setIsfound(true);
        alert(
          ` Đã tìm thấy số ${findNumber.toString()}  sau  ${step.toString()} bước`
        );
      }, 200);
      // setArrPos([arr[0].number]);
    }
  }, [arrPos]);
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
        backgroundColor: arrPos.includes(data.number) ? "red" : "yellow",
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