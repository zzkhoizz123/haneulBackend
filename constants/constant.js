const COMMENT_FLAG = {
    QandA: 1,
    REVIEW: 2 
}

const USER_ROLE = {
    CUSTOMER: 'C',
    ADMIN: 'A'
}

const USER_ACTIVATE = {
    ativate: 1,
    inactivate: 2
}

const ORDER_STATE = {
    DRAFT: 1,
    CONFIRMED: 2,
    CANCELLED: 3
}

const APPEARANCE = 1
const DISAPPEARANCE = 0

const LIMIT_QUERY = 1000

module.exports = {
    COMMENT_FLAG,
    USER_ROLE,
    USER_ACTIVATE,
    ORDER_STATE,
    APPEARANCE,
    DISAPPEARANCE,
    LIMIT_QUERY
}
