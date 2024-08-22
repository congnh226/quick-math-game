export const QUICK_MAFF_HIGH_SCORE = 'QUICK_MAFF_HIGH_SCORE';

export const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const initQuiz = (user) => {
    const quiz = {};

    if (!user || !user.score || (user && user.score < 50)) {
        quiz.a = getRandomNumberInRange(1, 10);
        quiz.b = getRandomNumberInRange(1, 10);
    } else if (user && user.score > 50 && user.score <= 150) {
        quiz.a = getRandomNumberInRange(10, 80);
        quiz.b = getRandomNumberInRange(10, 80);
    } else {
        quiz.a = getRandomNumberInRange(10, 500);
        quiz.b = getRandomNumberInRange(10, 500);
    }

    quiz.operator = getRandomNumberInRange(1, 10) <= 6 ? '+' : '-'; // 60% quiz is plus, 40% is subtract
    if (quiz.operator === '+') {
        quiz.result = quiz.a + quiz.b;
    } else {
        quiz.result = quiz.a - quiz.b;
    }

    // if result 50% true / 50% false
    if (getRandomNumberInRange(0, 1) === 1) {
        // if false result = result + delta
        quiz.result += getRandomNumberInRange(-7, 7);
    }

    return { ...user, ...quiz };
}
