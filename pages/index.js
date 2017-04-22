'use strict'

import React from 'react'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import Head from '../components/head'
import Loading from '../components/loading'
import Profile from '../components/Profile'
import Card from '../components/Card'
const data = require('../test/data/data.json')
const profile = require('../test/data/profile.json')
const getComparison = require('../lib/get-comparison')
const loadResults = require('../lib/load-results')
const generateComparison = require('../lib/generate-comparison')
const saveData = require('../lib/save-data')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  static async getInitialProps (ctx) {
    return {
      data: data,
      profile: profile,
      name: '',
      id: false,
      resultUrl: '',
      description: '',
      isLoading: false,
      showForm: false
    }
  }

  async componentDidMount () {
    if (this.state.resultId) {
      this.setState({isLoading: true})
      const saved = await getComparison(this.state.resultId)
      const data = await loadResults(saved.comparison)
      const comparisons = generateComparison(data)
      const show = this.state.show
      this.setState({data: data, isLoading: false, comparison: comparisons[show], comparisons: comparisons})
    }
  }

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()
    this.setState({isLoading: true})
    const prevData = this.state.data
    const data = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      url: this.state.resultUrl,
      user: this.state.profile.username
    }
    const result = await saveData(data)
    prevData.push(result)
    this.setState({name: '', description: '', resultUrl: '', id: false, showForm: false, isLoading: false})
  }

  handleToggle (event) {
    event.preventDefault()
    const show = !this.state.showForm
    this.setState({showForm: show})
  }

  render () {
    return (
      <div>
        <Head />
        <Container fluid>
          <Profile profile={this.state.profile} />
          {
            this.state.data.map(item => <Card data={item} key={item._id} />)
          }
          {
            this.state.showForm ? <Form onSubmit={this.handleSubmit}>
              <legend>Add new test</legend>
              <Input name='name' label='Name' floatingLabel value={this.state.name} onChange={this.handleChange} />
              <Input name='description' label='Description' floatingLabel value={this.state.description} onChange={this.handleChange} />
              <Input name='resultUrl' label='URL' floatingLabel value={this.state.resultUrl} onChange={this.handleChange} />
              <Button variant='raised' type='submit' disabled={this.state.isLoading}>Save</Button>
              <Button variant='raised' onClick={this.handleToggle}>Cancel</Button>
            </Form> : null
          }
          {
            !this.state.showForm ? <Button variant='raised' onClick={this.handleToggle}>Add link</Button> : null
          }

          <Loading loading={this.state.isLoading} />
        </Container>
        <footer className='mui-container mui--text-center'>
          <a href='https://github.com/zrrrzzt/bigfive-compare' target='_blank'>bigfive-profile</a><br />
              Made with ❤ by <a href='https://github.com/zrrrzzt/' target='_blank'>zrrrzzt</a> and <a href='https://github.com/maccyber' target='_blank'>maccyber</a>
        </footer>
      </div>
    )
  }
}
