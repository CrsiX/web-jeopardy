$.urlParam = function (name) {
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {
        return results[1]
    } else {
        return null
    }
}

$.getJSON($.urlParam('file') || 'http://localhost:8888/jeopardy.json').done(function (data) {
    console.log(data)
    let columnWidth = String(12 / data.length).replace(".", "-")
    $.each(data, function (id, category) {
        console.log(category)
        let categoryDiv = $('.category').first().clone()
        categoryDiv.hide()
        categoryDiv.removeClass('hidden')
        categoryDiv.addClass('col-md-' + columnWidth)
        categoryDiv.appendTo("#category-container")
        categoryDiv.find(".category-heading").html(category['name'])
        categoryDiv.find(".category-desc").html(category['description'])
        categoryDiv.fadeIn()

        $.each(category['questions'], function (id, question) {
            console.log(question)
            let questionDiv = categoryDiv.find('.question').first().clone()
            questionDiv.hide()
            questionDiv.removeClass('hidden')
            questionDiv.appendTo(categoryDiv)
            questionDiv.html("<b>" + question['label'] + "</b>")
            questionDiv.data('value', question['label'])
            questionDiv.data('question', question['q'])
            questionDiv.data('answer', question['a'])
            questionDiv.fadeIn()
        })
    })
})

window.lastButton = {}

$(document).on('click', '.question', function () {
    console.log($(this).data('question'))
    console.log($(this).data('value'));
    window.scores.current = $(this).data('value');

    window.lastButton = this;

    if ($(this).data('question').includes('.html')) {
        $('#question-modal').find('.modal-question').load($(this).data('question'))
    } else {
        $('#question-modal').find('.modal-question').html($(this).data('question'))
    }

    if ($(this).data('answer').includes('.html')) {
        $('#answer-modal').find('.modal-body').load($(this).data('answer'))
    } else {
        $('#answer-modal').find('.modal-body').html($(this).data('answer'))
    }
})

function updateScores() {
    $("#score-blue").text(window.scores.blue);
    $("#score-green").text(window.scores.green);
    $("#score-yellow").text(window.scores.yellow);
    $("#score-red").text(window.scores.red);
}

window.scores = {
    "blue": 0,
    "green": 0,
    "yellow": 0,
    "red": 0,
    "current": 0
}

$(document).on('click', '#answer-close', function () {
    $("#answer-modal").modal('hide');
    updateScores();
})

$(document).on('click', '#question-next', function () {
    $("#question-modal").modal('hide');
    if (window.lastButton !== undefined) {
        window.lastButton.disabled = true;
    }
    updateScores();
})

$(document).on('click', '#points-green-add', function () {
    console.log("Green Add");
    window.scores.green += +window.scores.current;
    updateScores();
})

$(document).on('click', '#points-green-del', function () {
    console.log("Green Del")
    window.scores.green -= +window.scores.current;
    updateScores();
})

$(document).on('click', '#points-blue-add', function () {
    console.log("Blue Add")
    window.scores.blue += +window.scores.current;
    updateScores();
})

$(document).on('click', '#points-blue-del', function () {
    console.log("Blue Del")
    window.scores.blue -= +window.scores.current;
    updateScores();
})

$(document).on('click', '#points-red-add', function () {
    console.log("Red Add")
    window.scores.red += +window.scores.current;
    updateScores();
})

$(document).on('click', '#points-red-del', function () {
    console.log("Red Del")
    window.scores.red -= +window.scores.current;
    updateScores();
})

$(document).on('click', '#points-yellow-add', function () {
    console.log("Yellow Add")
    window.scores.yellow += +window.scores.current;
    updateScores();
})

$(document).on('click', '#points-yellow-del', function () {
    console.log("Yellow Del")
    window.scores.yellow -= +window.scores.current;
    updateScores();
})
