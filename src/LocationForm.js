import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import styled from 'styled-components'
import createPersistedState from 'use-persisted-state'
import {
  convertToSelectOptions,
  getCities,
  getCountries,
  getStates,
} from './utils'

const useCountriesState = createPersistedState('countries')
const useStatesState = createPersistedState('states')
const useCitiesState = createPersistedState('cities')

const Container = styled.div`
  background-color: #ffffff;
  padding: 2em;
`

const LocationSelect = styled(Select)`
  width: 40vmin;
`

const LocationForm = props => {
  const { initialLocation } = props
  const [countries, setCountries] = useCountriesState()
  const [states, setStates] = useStatesState()
  const [cities, setCities] = useCitiesState()
  const [selectedCountry, setSelectedCountry] = useState(
    initialLocation?.country
  )
  const [selectedState, setSelectedState] = useState(initialLocation?.state)
  const [selectedCity, setSelectedCity] = useState(initialLocation?.city)

  useEffect(() => {
    ;(async () => {
      if (!countries) {
        setCountries(await getCountries())
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async () => {
      const country = selectedCountry
      if (country && !states?.[country]) {
        const data = await getStates(country)
        setStates(states => ({ ...states, [country]: data }))
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry])

  useEffect(() => {
    ;(async () => {
      const country = selectedCountry
      const state = selectedState
      if (country && state && !cities?.[country]?.[state]) {
        const data = await getCities(state, country)
        setCities(cities => ({
          ...cities,
          [country]: cities?.[country]
            ? { ...cities[country], [state]: data }
            : { [state]: data },
        }))
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState])

  const onSelectCountry = useCallback(
    option => {
      setSelectedCountry(option.value)
      setSelectedState('')
      setSelectedCity('')
    },
    [setSelectedCountry, setSelectedState, setSelectedCity]
  )

  const onSelectState = useCallback(
    option => {
      setSelectedState(option.value)
      setSelectedCity('')
    },
    [setSelectedState, setSelectedCity]
  )

  const onSelectCity = useCallback(
    option => {
      setSelectedCity(option.value)
    },
    [setSelectedCity]
  )

  const countriesOptions = useMemo(() => convertToSelectOptions(countries), [
    countries,
  ])
  const statesOptions = useMemo(
    () => convertToSelectOptions(states?.[selectedCountry]),
    [states, selectedCountry]
  )
  const citiesOptions = useMemo(
    () => convertToSelectOptions(cities?.[selectedCountry]?.[selectedState]),
    [cities, selectedCountry, selectedState]
  )

  return (
    <Container>
      <LocationSelect
        name='country'
        options={countriesOptions}
        tabIndex='0'
        value={
          countriesOptions.find(option => option.value === selectedCountry) ||
          ''
        }
        onChange={onSelectCountry}
      />
      <LocationSelect
        name='state'
        options={statesOptions}
        tabIndex='1'
        value={
          statesOptions.find(option => option.value === selectedState) || ''
        }
        onChange={onSelectState}
        isDisabled={!statesOptions.length}
      />
      <LocationSelect
        name='city'
        options={citiesOptions}
        tabIndex='2'
        value={
          citiesOptions.find(option => option.value === selectedCity) || ''
        }
        onChange={onSelectCity}
        isDisabled={!citiesOptions.length}
      />
    </Container>
  )
}

LocationForm.propTypes = {
  initialLocation: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
  }),
}

export default LocationForm
