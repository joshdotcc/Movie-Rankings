// Data for leaderboard (realistic movie titles and ratings)
const leaderboardMovies = [
    {
        // avatar: "https://upload.wikimedia.org/wikipedia/en/3/3e/Cars_2006.jpg",
        username: "Cars",
        soundtrack: 5.0,
        overall: 5.0
    },
    {
        // avatar: "https://upload.wikimedia.org/wikipedia/en/6/6e/Chicken_Little_poster.jpg",
        username: "Chicken Little",
        soundtrack: 4.5,
        overall: 4.9
    },
    {
        // avatar: "https://upload.wikimedia.org/wikipedia/en/6/63/Monsters_Inc.JPG",
        username: "Monsters, Inc.",
        soundtrack: 3.0,
        overall: 4.5
    },
    {
        username: "Rio",
        soundtrack: 3.0,
        overall: 4.2
    }
];

const watchListMovies = [
    "Flubber",
    "Ratatoulli",
    "Flushed Away",
    "The Goonies",
    "Surfs up",
    "Happy Feet",
    "Casper",
    "ET",
    "Ghostbusters",
    "Space Jam",
    "Jurassic Park",
    "Honey I shrunk the kids",
    "The little rascals",
    "Ferris Beulers Day off",
    "Stuart Little",
    "Tale of Despereux",
    "Turbo",
    "Bolt",
    "Shark Tale",
    "Night at The Museum",
    "National Treasure",
    "The Pink Panther",
    "Ice Age",
    "Sky High",
    "Beethoven",
    "Atlantis the Lost Empire",
    "Robots",
    "Madagascar",
    "Rango",
    "Yogi Bear",
    "The Incredibles",
    "Shrek",
    "Kung Fu Panda",
    "How to Train Your Dragon",
    "The Last Airbender",
    "Up",
    "Hairspray",
    "Lemonade Mouth",
    "Finding Nemo",
    "Zookeeper",
    "Open Season",
    "Click",
    "The Pacifier",
    "The Croods",
    "The Ant Bully",
    "WALL-E",
    "Aladdin",
    "Beauty and the Beast",
    "Emperor’s New Groove",
    "Megamind",
    "Mrs. Doubtfire",
    "Chicken Run",
    "Holes",
    "A Goofy Movie",
    "Brother Bear",
    "Meet the Robinsons",
    "Over the Hedge",
    "Hoodwinked",
    "Hackers",
    "The Art of Racing in the Rain",
];

// Example reviews for each movie (customize as desired)
const movieReviews = {
    "Cars": "An instant classic. Amazing story, easily the best movie/sountrack combo of the century.",
    "Chicken Little": "Cute little chicken, what's not to love? arguably the best baseball movie of the 2000s",
    "Monsters, Inc.": "This movie leans a little on the scary side, Randal may look like a lizard, but he's more of a snake.",
    "Rio": "Nigel kinda ruined the soundtrack, maybe the most unlikeable villain possible. He has 0 redeeming qualities."
};

let currentTab = "overall";
let sortAsc = false;

function getMedal(rank) {
    if (rank === 1) return '<span class="rank-medal">&#129351;</span>'; // 🥇
    if (rank === 2) return '<span class="rank-medal">&#129352;</span>'; // 🥈
    if (rank === 3) return '<span class="rank-medal">&#129353;</span>'; // 🥉
    return '';
}

function renderTable(tab, sortBy, asc) {
    const sorted = [...leaderboardMovies].sort((a, b) => {
        if (asc) return a[sortBy] - b[sortBy];
        else return b[sortBy] - a[sortBy];
    });

    const tbody = document.getElementById("leaderboard-body");
    tbody.innerHTML = "";
    sorted.forEach((user, idx) => {
        let trClass = "";
        if (idx === 0) trClass = "rank-1";
        else if (idx === 1) trClass = "rank-2";
        else if (idx === 2) trClass = "rank-3";
        tbody.innerHTML += `
            <tr class="${trClass}">
                <td class="rank-cell">${getMedal(idx+1)}<span class="rank-num">${idx+1}</span></td>
                <td class="user">
                    <span class="username">${user.username}</span>
                </td>
                <td class="rating">
                    <span class="score-num">${user[tab].toFixed(1)}</span>
                </td>
                <td>
                    <button class="review-btn" data-movie="${encodeURIComponent(user.username)}">Review</button>
                </td>
            </tr>
        `;
    });

    // Update header text
    const ratingHeader = document.getElementById("rating-header");
    ratingHeader.innerHTML = (tab === "soundtrack" ? "Soundtrack" : "Overall") + " &#8597;";

    // Attach review button listeners
    document.querySelectorAll('.review-btn').forEach(btn => {
        btn.onclick = function() {
            openReviewModal(decodeURIComponent(this.getAttribute('data-movie')));
        };
    });
}

function renderWatchList() {
    const ul = document.getElementById("watch-list");
    ul.innerHTML = "";
    watchListMovies.forEach(title => {
        const li = document.createElement("li");
        li.textContent = title;
        ul.appendChild(li);
    });
}

// Modal logic
function openReviewModal(movieTitle) {
    document.getElementById('modal-movie-title').textContent = `Review: ${movieTitle}`;
    document.getElementById('modal-review-text').value = movieReviews[movieTitle] || "No review yet.";
    document.getElementById('review-modal').style.display = 'flex';
}
function closeReviewModal() {
    document.getElementById('review-modal').style.display = 'none';
}
document.getElementById('close-modal').onclick = closeReviewModal;
document.getElementById('review-modal').onclick = function(e) {
    if (e.target === this) closeReviewModal();
};

// Tab switching
document.getElementById("tab-overall").onclick = function() {
    currentTab = "overall";
    sortAsc = false;
    this.classList.add("active");
    document.getElementById("tab-soundtrack").classList.remove("active");
    renderTable("overall", "overall", sortAsc);
};
document.getElementById("tab-soundtrack").onclick = function() {
    currentTab = "soundtrack";
    sortAsc = false;
    this.classList.add("active");
    document.getElementById("tab-overall").classList.remove("active");
    renderTable("soundtrack", "soundtrack", sortAsc);
};

// Sorting
document.getElementById("rating-header").onclick = function() {
    sortAsc = !sortAsc;
    renderTable(currentTab, currentTab, sortAsc);
};

// Initial render
renderTable("overall", "overall", sortAsc);
renderWatchList();
renderWatchList();
