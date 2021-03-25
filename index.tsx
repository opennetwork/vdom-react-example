import React, {useCallback, useEffect, useReducer, useRef, useState} from "react";
import { render, DOMVContext } from "@opennetwork/vdom";
import { React as ReactWrapper } from "@opennetwork/vdom-react";
import { Fragment } from "@opennetwork/vnode";

window.setImmediate = window.setImmediate || setTimeout;

async function UpdatingComponent() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const todos = await response.json();
    return <pre>{JSON.stringify(todos, undefined, "  ")}</pre>
}

function Info() {
    return (
        <>
            <h1>Hello!</h1>
            <p>You are currently viewing a page that was built using React</p>
            <p>However, there is a twist, it is rendered using a completely async renderer</p>
            <p>
                Currently the intermediate react renderer has support for react function
                components that utilise hooks, like this button component:
            </p>
            <WithButton />
            <p>
                This component below fetches from an external API:
            </p>
            <UpdatingComponent />
            <p>
                You can view the source code for this page at:&nbsp;
                <a href="https://github.com/opennetwork/vdom-react-example/blob/main/index.tsx">github.com/opennetwork/vdom-react-example/blob/main/index.tsx</a>
            </p>
            <p>
                The page was rendered with:&nbsp;
                <a href="https://github.com/opennetwork/vdom-react">github.com/opennetwork/vdom-react</a>
            </p>
            <p>
                vdom-react in real time translates react components to vdom compatible DOM nodes<br />
                This allows vdom to hydrate the virtual nodes directly into a DOM
            </p>
            <p>
                You can see the implementation for vdom at:&nbsp;
                <a href="https://github.com/opennetwork/vdom">github.com/opennetwork/vdom</a>
            </p>
            <p>
                Or the source for vnode at:&nbsp;
                <a href="https://github.com/opennetwork/vnode/blob/main/src/create-node.ts#L45">github.com/opennetwork/vnode</a>
            </p>
        </>
    )
}

function WithButton() {
    const [state, onIncrement] = useReducer((state) => state + 1, 0);
    const onClick = useCallback(async () => {
        onIncrement();
    }, [onIncrement])
    useEffect(() => {
        console.log({ state });
    }, [state])
    return (
        <>
            <button onClick={onClick} className="test">Current State: {`${state}`}</button>
        </>
    )
}

function App() {
    // Trigger react compat using a hook at the top level, a ref is okay
    useRef();
    return (
        <>
            <Info />
        </>
    )
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
