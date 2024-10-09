import React from 'react'

import { createIcon } from '@chakra-ui/icons'

export const VisibleOffIcon = createIcon({
  displayName: 'VisibleOffIcon',
  viewBox: '0 0 24 24',
  path: (
    <>
      <path
        clipRule="evenodd"
        d="M21.9878 11.7001C20.3582 7.61654 16.3881 4.95492 11.9939 5.00008C7.629 4.97483 3.69114 7.61885 2.05997 11.6701C2.02156 11.7759 2.00129 11.8875 2.00001 12.0001C1.99948 12.1063 2.01986 12.2117 2.05997 12.3101C3.68479 16.3692 7.62406 19.0221 11.9939 19.0001C16.3588 19.0253 20.2967 16.3813 21.9279 12.3301C21.9706 12.2255 21.9911 12.1131 21.9878 12.0001C22.0041 11.9007 22.0041 11.7994 21.9878 11.7001ZM11.9939 17.0001C8.6124 16.9925 5.5333 15.0499 4.06875 12.0001C5.52824 8.94606 8.61076 7.00207 11.9939 7.00207C15.3771 7.00207 18.4596 8.94606 19.9191 12.0001C18.4545 15.0499 15.3754 16.9925 11.9939 17.0001ZM8.99575 12.0001C8.99575 10.3432 10.3381 9.00008 11.9939 9.00008C13.6498 9.00008 14.9921 10.3432 14.9921 12.0001C14.9921 13.6569 13.6498 15.0001 11.9939 15.0001C10.3381 15.0001 8.99575 13.6569 8.99575 12.0001Z"
        fill="currentColor"
        fillRule="evenodd"
      />

      <g filter="url(#filter0_i_0_10108)">
        <line stroke="currentColor" strokeWidth="3" x1="3.06066" x2="20.0312" y1="2.93934" y2="19.9099" />
      </g>

      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="19.0919"
          id="filter0_i_0_10108"
          width="19.0918"
          x="2"
          y="1.87868"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />

          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />

          <feOffset dy="2" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend in2="shape" mode="normal" result="effect1_innerShadow_0_10108" />
        </filter>
      </defs>
    </>
  )
})
