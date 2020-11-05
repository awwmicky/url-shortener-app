import { useState,useEffect,useCallback } from 'react'
import copy from 'copy-to-clipboard'


export default function useClipboard (reset = null) {
    const [ isCopied,setCopied ] = useState(false);

    useEffect(() => {
        let timeout;

        if (isCopied && reset) {
            timeout = setTimeout(() => setCopied(false), reset);
        }

        return () => clearTimeout(timeout);
    }, [ isCopied,reset ])

    const handleCopy = useCallback(text => {
        if (typeof text === "string" || typeof text == "number") {
            copy( text.toString() )
            setCopied( true )
        } else {
            setCopied( false )
            console.error(
                `Cannot copy typeof ${typeof text} to clipboard.`
            );
        }
    }, [ ]);

    return [ isCopied,handleCopy ];
}