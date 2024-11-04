// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { createContext, useContext, useEffect } from 'react'

import { UseDisclosureProps, UseDisclosureReturn, useDisclosure } from '@chakra-ui/react'

type DisclosuresId = string
export type DisclosureData = Record<DisclosuresId, UseDisclosureReturn>

export interface DisclosureTrackerContextProps {
  disclosureTrackerAPI: {
    addToTracker: (id: DisclosuresId, disclosureData: UseDisclosureReturn) => void
    removeFromTracker: (id: DisclosuresId) => void
    openById: (id: DisclosuresId) => void
    closeById: (id: DisclosuresId) => void
    closeAll: () => void
    getStateById: (id: DisclosuresId) => boolean
  }
}

const defaultDisclosureTrackerContext: DisclosureTrackerContextProps = {
  disclosureTrackerAPI: {
    addToTracker: () => undefined,
    removeFromTracker: () => undefined,
    openById: () => undefined,
    closeById: () => undefined,
    closeAll: () => undefined,
    getStateById: () => false
  }
}

const disclosureTracker: DisclosureData = {}

export const DisclosureTrackerContext = createContext<DisclosureTrackerContextProps>(defaultDisclosureTrackerContext)

export const DisclosureTrackerProvider: React.FC<{ children: React.ReactNode | Array<React.ReactNode> }> = props => {
  const { children } = props

  const addToTracker = (id: DisclosuresId, disclosureData: UseDisclosureReturn) => {
    disclosureTracker[id] = disclosureData
  }

  const removeFromTracker = (id: DisclosuresId) => {
    if (id in disclosureTracker) {
      delete disclosureTracker[id]
    }
  }

  const openById = (id: DisclosuresId) => {
    if (!(id in disclosureTracker) || disclosureTracker[id].isOpen) {
      return
    }

    disclosureTracker[id].onOpen()
  }

  const closeById = (id: DisclosuresId) => {
    if (!(id in disclosureTracker) || !disclosureTracker[id].isOpen) {
      return
    }

    disclosureTracker[id].onClose()
  }

  const closeAll = () => {
    Object.keys(disclosureTracker).forEach(id => {
      closeById(id)
      disclosureTracker[id].isOpen = false
    })
  }

  const getStateById = (id: DisclosuresId) => {
    return disclosureTracker[id].isOpen
  }

  const contextValue = React.useMemo(
    () => ({
      disclosureTrackerAPI: {
        addToTracker,
        removeFromTracker,
        openById,
        closeById,
        closeAll,
        getStateById
      }
    }),
    [addToTracker, removeFromTracker, openById, closeById, closeAll, getStateById]
  )

  return <DisclosureTrackerContext.Provider value={contextValue}>{children}</DisclosureTrackerContext.Provider>
}

export const useDisclosureTracker = (disclosureId: string, props?: UseDisclosureProps): UseDisclosureReturn => {
  const { disclosureTrackerAPI } = useContext(DisclosureTrackerContext)
  const disclosure = useDisclosure(props)

  useEffect(() => {
    // Register the disclosure to the disclosureTracker
    disclosureTrackerAPI.addToTracker(disclosureId, disclosure)

    return () => {
      // Unregister the disclosure from the disclosureTracker
      disclosureTrackerAPI.removeFromTracker(disclosureId)
    }
  }, [])

  useEffect(() => {
    // Syncing the state of the disclosure with the disclosureTracker
    if (disclosureTracker[disclosureId]) {
      disclosureTracker[disclosureId].isOpen = disclosure.isOpen
    }
  }, [disclosure.isOpen])

  // return the disclosure data from useDisclosure hook, so they can be consumed in the component
  return disclosure
}
