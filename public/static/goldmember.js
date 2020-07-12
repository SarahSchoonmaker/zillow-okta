
const API_KEY = '00J3tgcyf_WE0CigWG1BPy4aJPVRH9aqa1dyPV_HDG'
const GOLD_MEMBER_GROUP_ID = '00gjdohveuRdLd4M54x6'

$(document).ready(() => {
    const userId = JSON.parse($('#userId').val());
    init(userId.userId)
})

const init = async (userId) => {
    const user = await getLoggedInUserData(userId)
    const { data : { profile }} = user
    window.userProfileData = profile
};

const subscribe = (e) => {
    const userId = e.value;
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `SSWS ${API_KEY}`,
            'Content-Type':  'application/json',
        },
        url: `https://dev-772683-admin.okta.com/api/v1/groups/${GOLD_MEMBER_GROUP_ID}/users/${userId}?timestamp=${+ new Date}`
    }
    axios(options);
}

const getLoggedInUserData = async (userId) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `SSWS ${API_KEY}`,
            'Content-Type':  'application/json',
        },
        url: `https://dev-772683-admin.okta.com/api/v1/users/${userId}`
    }
    const resp = await axios(options)
    console.log("This is resp?", resp);
    return resp;
}

const searchUser = (e) => {
    const memberIdquery = $('#memberId').val()
    const lastNameQuery = $('#lastName').val()
    let isGoldUser = false;
    if(memberIdquery && lastNameQuery){
        const userId = e.value;
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `SSWS ${API_KEY}`,
                'Content-Type':  'application/json',
            },
            url: `https://dev-772683-admin.okta.com/api/v1/groups/${GOLD_MEMBER_GROUP_ID}/users`
        }
        axios(options).then((searchResult) => {
            const users = searchResult.data
            users.forEach((user) => {
                console.log("user?", user, memberIdquery)
                if (user.id.toUpperCase() === memberIdquery) {
                    isGoldUser = true;
                }
            })
            const profile = window.userProfileData;
            const { lastName, firstName, managerId } = profile;
            if(isGoldUser) {
                $('.searchResult').html(`<br>

                <pre class="displayText"> ${firstName} ${lastName}, ${memberIdquery}, You are part of the gold group. Your manager ID is ${managerId}.</pre>
                <a class="btn btn-primary my-2 my-sm-0 linkText" href="/goldsection"> Visit Gold Page </a> 
                <br>`)
            } else {
                $('.searchResult').html('<div class="displayText">You are not part of the gold group, please contact admin to be added.</div>')
            }
        });
    } else {
        alert("Please fill in both member ID & Last Name")
    }
}