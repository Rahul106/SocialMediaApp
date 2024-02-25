// Function to switch between tabs
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the selected tab
  if (evt && evt.currentTarget) {
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
  }
}

// Function to create a new post
async function createPost(event) {
  event.preventDefault();

  // Get form values using event.target directly
  var username = event.target.form.usernames.value;
  var postLink = event.target.form.postLink.value;
  var postDescription = event.target.form.postDescription.value;

  // Check if any of the fields are empty
  if (!username || !postLink || !postDescription) {
    return alert("Please fill in all fields.");
  }

  // Log the form values to the console
  console.log("Username:", username);
  console.log("Post Link:", postLink);
  console.log("Post Description:", postDescription);

  // Create postObject with form values
  const postObject = {
    username: username,
    postLink: postLink,
    postDescription: postDescription,
  };

  // Use postObject as needed
  console.log("Post Object:", postObject);

  try {

    const response = await axios.post("http://localhost:3000/mingleglobe/add/post", postObject);

    console.log("Post created:", response.data);

    if (response.status === 201) {
      alert("Post added successfully");
      location.reload();
    } else {
      alert("Post Failed");
    }

  } catch (error) {
    console.error(`Error adding post :  ${error}`);
  }

}


// Function to fetch all posts
async function fetchPosts() {

  const postsList = document.getElementById("postsList");

  // Clear existing posts
  postsList.innerHTML = "";

  try {
    
    const response = await axios.get("http://localhost:3000/mingleglobe/fetch/posts");
    
    // Accessing the 'data' property from the response
    const posts = response.data.data; 

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      
      // Setting postLink, postDescription, and username
      const postLink = post.postLink;
      const postDescription = post.postDescription;
      const username = post.user.username;
      console.log('-------------'+username)

      postElement.innerHTML = `
          <img src="${postLink}" alt="Post Image">
          <p>
            <strong>Username:</strong> ${username}<br>
            <strong>Description:</strong> ${postDescription}
          </p>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-primary" onclick="handleLike(${post.id})">
              <i class="bi bi-hand-thumbs-up"></i> Like <span id="likeCount_${post.id}">0</span>
            </button>
            <button type="button" class="btn btn-outline-danger" onclick="handleDislike(${post.id})">
              <i class="bi bi-hand-thumbs-down"></i> Dislike <span id="dislikeCount_${post.id}">0</span>
            </button>
            <button type="button" class="btn btn-outline-success" onclick="handleShare(${post.id})">
              <i class="bi bi-share"></i> Share <span id="shareCount_${post.id}">0</span>
            </button>
          </div>
          <div class="commentsCont">
            <br>
            <div class="input-group">
              <input type="text" id="comment_${post.id}" class="form-control" placeholder="Your comment" aria-label="Your comment" aria-describedby="button-addon_${post.id}">
              <button class="btn btn-primary" type="button" id="button-addon_${post.id}" onclick="addComment(${post.id}, '${username}')"><i class="bi bi-chat-dots"></i> Add Comment</button>
            </div>  
            <h5 class="mt-2 mb-2" onclick="viewAllComments(${post.id})"><i class="bi bi-chat-left-quote"></i> <strong>Comments</strong></h5>
            <ul id="comments_${post.id}" class="list-group" style="display: none;"></ul>
          </div>
          <br><br>
        `;
      postsList.appendChild(postElement);
    });

  } catch (error) {
    console.error("Error fetching posts:", error);
  }

}


// Function to add a comment to a post
async function addComment(postId, username) {
  
  const commentInput = document.getElementById(`comment_${postId}`);
  const commentText = commentInput.value;
  commentInput.value = "";

  try {
    
    const response = await axios.post(`http://localhost:3000/mingleglobe/add/${postId}/comment`,
      {
        text: commentText,
        username: username, // Include the username when adding comment
      }
    );

    console.log("Comment added:", response.data);
    
    // Call a function to view all comments for the post
    // Update: Call to display comments immediately after adding
    viewAllComments(postId); 
  
  } catch (error) {
    console.error("Error adding comment:", error);
  }
  
}


// Function to view all comments for a post
async function viewAllComments(postId) {
  const commentsList = document.getElementById(`comments_${postId}`);

  try {

    const response = await axios.get(`http://localhost:3000/mingleglobe/fetchall/comments/${postId}`);
    console.log(response.data.status)

     if(response.data.status === '200') {
      
      const comments = response.data.data;
      commentsList.innerHTML = "";

      comments.forEach((comment) => {
      
        const commentElement = document.createElement("li");
        commentElement.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "mb-2",
        "comment-item"
      );
        commentElement.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="https://www.w3schools.com/bootstrap/img_avatar3.png" height="30px" width="30px" alt="User Avatar" class="avatar mr-3">
          <div>
            <h6 class="mb-0"><strong>${"anonymous-user"}</strong></h6>
            <p class="mb-0">${comment.content}</p>
          </div>
        </div>
        <div>
          <button class="btn btn-outline-danger btn-sm delete-comment" onclick="deleteComment(${postId}, ${
        comment.id
      })">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;
      commentsList.appendChild(commentElement);
    });

    // Show the comments list
    commentsList.style.display = "block";
  }

  } catch (error) {
    if(error.response.data.status === '404') {
      console.log('-------No Comments Found--------');
    }
    console.log("Error fetching comments:", error);    
  }
}

// Event listener for creating a new post
document.addEventListener("DOMContentLoaded", function () {
  var createPostBtn = document.getElementById("createPostBtn");
  if (createPostBtn) {
    createPostBtn.addEventListener("click", createPost);
  }
});

// Event listener for fetching and displaying posts
document.addEventListener("DOMContentLoaded", function () {
  var viewHomePosts = document.getElementById("viewHomePosts");
  if (viewHomePosts) {
    viewHomePosts.addEventListener("click", fetchPosts);
  }
});

// Event listener for switching tabs
document.addEventListener("DOMContentLoaded", function () {
  const defaultOpenButton = document.getElementById("defaultOpen");
  if (defaultOpenButton) {
    defaultOpenButton.click();
  }
});

// Object to store counts for each post
const postCounts = {};

// Function to handle liking a post
function handleLike(postId) {
  if (!postCounts[postId]) {
    postCounts[postId] = { likes: 0, dislikes: 0, shares: 0 };
  }
  postCounts[postId].likes++;
  updateCounts(postId);
}

// Function to handle disliking a post
function handleDislike(postId) {
  if (!postCounts[postId]) {
    postCounts[postId] = { likes: 0, dislikes: 0, shares: 0 };
  }
  postCounts[postId].dislikes++;
  updateCounts(postId);
}

// Function to handle sharing a post
function handleShare(postId) {
  if (!postCounts[postId]) {
    postCounts[postId] = { likes: 0, dislikes: 0, shares: 0 };
  }
  postCounts[postId].shares++;
  updateCounts(postId);
}

// Function to update the counts displayed on the buttons
function updateCounts(postId) {
  const likeCountElement = document.getElementById(`likeCount_${postId}`);
  const dislikeCountElement = document.getElementById(`dislikeCount_${postId}`);
  const shareCountElement = document.getElementById(`shareCount_${postId}`);

  if (likeCountElement && dislikeCountElement && shareCountElement) {
    likeCountElement.textContent = postCounts[postId].likes;
    dislikeCountElement.textContent = postCounts[postId].dislikes;
    shareCountElement.textContent = postCounts[postId].shares;
  }
}
