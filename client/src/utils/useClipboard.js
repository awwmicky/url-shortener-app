import { useState,useEffect,useCallback } from 'react'
import copy from 'copy-to-clipboard'


export default function useClipboard (reset = null) {
    const [ isCopied,setCopied ] = useState(false);

    useEffect(() => {
        let timeout;
        const disableBtn = () => setCopied(false);
        if (isCopied && reset) timeout = setTimeout(disableBtn,reset);
        return () => clearTimeout(timeout);
    }, [ isCopied,reset ])

    const copyLink = useCallback(text => {
        if (typeof text === "string" || typeof text == "number") {
            copy( text.toString() )
            setCopied( true )
        } else { setCopied( false ) }
    }, [ ]);

    return [ isCopied,copyLink ];
}