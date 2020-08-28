import Value from '../Contract.json';

export const OBJECT_MAP_TO_JSON = (data = null) => {
    const json = JSON.parse(JSON.stringify(Value))[0];
    const FIRST_REQ = json.required.first;
    const SECOND_REQ = json.required.second;
    const SECOND_OPT = json.optional.second;
    const THIRD_OPT = json.optional.third;
    if (!!data) {
        const FIRST_REQ_RESP = FIRST_REQ.map(v => {
            v.value = data[v.name];
            return v;
        })
        const SECOND_REQ_RESP = SECOND_REQ.map(v => {
            v.value = data[v.name];
            return v;
        })
        const SECOND_OPT_RESP = SECOND_OPT.map(v => {
            v.value = data[v.name];
            return v;
        })
        const THIRD_OPT_RESP = THIRD_OPT.map(v => {
            v.value = data[v.name];
            return v;
        })
        return { FIRST_REQ_RESP, SECOND_REQ_RESP, SECOND_OPT_RESP, THIRD_OPT_RESP };
    }
    return { FIRST_REQ, SECOND_REQ, SECOND_OPT, THIRD_OPT };
}


export const JSON_MAP_TO_OBJECT = (json) => {
    const FIRST_REQ = json.first_req;
    const SECOND_REQ = json.second_req;
    const SECOND_OPT = json.second_opt;
    const THIRD_OPT = json.third_opt;

    const FIRST_OBJ = {};
    const SECOND_OBJ = {};
    const THIRD_OBJ = {};

    FIRST_REQ.map(v => {
        FIRST_OBJ[v.name] = v.value;
        return v;
    })
    SECOND_REQ.map(v => {
        SECOND_OBJ[v.name] = v.value;
        return v;
    })
    SECOND_OPT.map(v => {
        SECOND_OBJ[v.name] = v.value;
        return v;
    })
    THIRD_OPT.map(v => {
        THIRD_OBJ[v.name] = v.value;
        return v;
    })
    return { ...FIRST_OBJ, ...SECOND_OBJ, ...THIRD_OBJ };
}