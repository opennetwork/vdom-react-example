import React, {useCallback, useEffect, useRef, useState} from "react";
import { render, DOMVContext } from "@opennetwork/vdom";
import { React as ReactWrapper } from "@opennetwork/vdom-react";
import { Fragment } from "@opennetwork/vnode";

window.setImmediate = window.setImmediate || setTimeout;

let index = 0;

function WithButton() {
    const [state, setState] = useState<string>(() => "test");
    const onClick = useCallback(async () => {
        setState(`some state ${index += 1}`);
    }, [setState])
    useEffect(() => {
        console.log({ state });
    }, [state])
    return (
        <>
            <button onClick={onClick} className="test">Current State: {state}</button>
            <h1>Hello!</h1>
        </>
    )
}

function App() {
    useRef();
    return <p>Test<WithButton /></p>
}

const root = document.getElementById("root");

if (!root) {
    throw new Error("Expected root");
}

const context = new DOMVContext({
    root
});

await render(
    ReactWrapper(
        {},
        {
            source: App,
            options: {},
            reference: Fragment
        }
    ),
    context
);
