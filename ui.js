const emotionSelector = document.getElementsByClassName("emotion_selector");

Array.from(emotionSelector).map((ele) => {
  let emotionActionBtns = "";
  for (color in EMOTION_COLOR_CODES) {
    emotionActionBtns += `
        <div class="color_con" emotion-action-type="${ele.getAttribute("type")}" emotion-action-id="${EMOTION_COLOR_CODES[color].id}">
            <div class="color_circle" style="background-color: ${EMOTION_COLOR_CODES[color].code};"></div>
            <p>${EMOTION_COLOR_CODES[color].label}</p>
        </div>
        `;
  }
  ele.innerHTML = emotionActionBtns;
});


const handleWrite = (x, y) => {
    let payload = {
        coordinate: `${x},${y}`,
        emotion: {
            creator: 0,
            happy: 0,
            sad: 0,
            cry: 0,
            angry: 0,
            nostalgia: 0
        }
    }

    const emotionReact = document.getElementsByClassName("color_con");

    const setActiveReactCta = (actionType, actionId) => {
        Array.from(emotionReact).map((ele) => {
        if (
            ele.getAttribute("emotion-action-type") == actionType && ele.getAttribute("emotion-action-id") == actionId) {
            ele.classList.add("active");
            payload.emotion.creator = parseInt(actionId)
        } else {
            ele.classList.remove("active");
        }
        });
    };

    return {
        flush: () => {
            Array.from(emotionReact).map((ele) => ele.classList.remove("active"));
        },
        init: () => {            
            Array.from(emotionReact).map((ele) => {
                ele.addEventListener("click", () => setActiveReactCta(ele.getAttribute("emotion-action-type"), ele.getAttribute("emotion-action-id")));
            });
        
            document.getElementById('id_write_text_area').addEventListener('input', (event) => {
                payload['body'] = event.target.value
            })
        
            document.getElementById('id_post_story').addEventListener('click', () => {
                createPost(payload)
            })
        }
    }
}

const handleRead = (id, body) => {
    return {
        init: () => {            
            document.getElementById('id_read_text_area').innerText = body
        }
    }
}


async function fetchPosts() {
  try {
    const response = await fetch(URLS.GET_POSTS, {
      method: "GET",
      headers: {
        apikey: API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

const drawGrids = async () => {
  const posts = await fetchPosts();
  let _coordinates = coordinates;

  _coordinates = _coordinates.map((coordinate) => {
    const _post = posts?.find((_) => {
      if (
        coordinate.x == _.coordinate.split(",")[0] &&
        coordinate.y == _.coordinate.split(",")[1]
      ) {
        return _;
      }
    });

    if (_post) {
      let color = "";
      const reactions = JSON.parse(_post.emotion);
      const highestReaction = findGreatestValueKey(reactions);
      if (highestReaction == "creator") {
        Object.keys(EMOTION_COLOR_CODES).map((key) => {
          if (EMOTION_COLOR_CODES[key].id == reactions["creator"]) {
            color = EMOTION_COLOR_CODES[key].code;
          }
        });
      } else {
        color = EMOTION_COLOR_CODES[highestReaction].code;
      }
      return {
        id: _post.id,
        x: parseInt(_post.coordinate.split(",")[0]),
        y: parseInt(_post.coordinate.split(",")[1]),
        body: _post.body,
        reactions: reactions,
        color,
      };
    } else return coordinate;
  });
  coordinates = _coordinates;
  draw()
};

drawGrids();

async function createPost(payload) {
  const postData = new URLSearchParams({
    body: payload.body,
    emotion: JSON.stringify(payload.emotion),
    coordinate: payload.coordinate,
  });

  try {
    const response = await fetch(URLS.POST_POSTS, {
      method: "POST",
      headers: {
        apikey: API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

 // createPost();
