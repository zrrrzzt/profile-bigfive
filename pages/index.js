'use strict'

import React from 'react'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Head from '../components/head'
import Loading from '../components/loading'
import Profile from '../components/Profile'
import Card from '../components/Card'
import Test from '../components/Test'
const nodeCookie = require('cookie')
const getData = require('../lib/get-data')
const saveData = require('../lib/save-data')
const deleteData = require('../lib/delete-data')
const tests = require('../lib/data/tests.json')
const config = require('../config')
const logoutUrl = `${config.authUrl}/logout`

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  static async getInitialProps (ctx) {
    const parsed = ctx.req.headers && ctx.req.headers.cookie ? nodeCookie.parse(ctx.req.headers.cookie) : {}
    let profile = false
    let tmp = parsed.profile
    if (tmp) {
      tmp = tmp.replace('"{', '{')
      tmp = tmp.replace('}"', '}')
      profile = JSON.parse(tmp)
    }

    if (!profile) {
      const url = `${config.authUrl}/facebook?success=https://profile.bigfive.world`
      if (typeof window !== 'undefined') {
        window.location = url
      } else {
        ctx.res.writeHead(302,
          { Location: url }
        )
        ctx.res.end()
      }
    } else {
      return {
        data: [],
        tests: tests,
        profile: profile,
        name: '',
        id: false,
        resultUrl: '',
        description: '',
        isLoading: false,
        showForm: false
      }
    }
  }

  async componentDidMount () {
    this.setState({ isLoading: true })
    const data = await getData({ user: this.state.profile.username })
    this.setState({ data: data, isLoading: false })
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
    this.setState({ isLoading: true })
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
    this.setState({ name: '', description: '', resultUrl: '', id: false, showForm: false, isLoading: false })
  }

  async handleDelete (event) {
    event.preventDefault()
    this.setState({ isLoading: true })
    const key = event.target.dataset.key
    const prevData = this.state.data
    const result = await deleteData(key)
    this.setState({ isLoading: false })
    const newData = prevData.filter(item => item.id !== result.id)
    this.setState({ data: newData })
  }

  handleToggle (event) {
    event.preventDefault()
    const show = !this.state.showForm
    this.setState({ showForm: show })
  }

  render () {
    return (
      <div>
        <Head />
        <Container fluid>
          <Profile profile={this.state.profile} logoutUrl={logoutUrl} />
          <Row>
            <Col md='6'>
              {
                this.state.data.map(item => <Card data={item} key={item.id} deleteMe={this.handleDelete} />)
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
                !this.state.showForm ? <div className='mui--clearfix'><Button size='large' variant='fab' color='primary' className='mui--pull-right mui--text-headline material-icons' onClick={this.handleToggle}>add</Button></div> : null
              }
            </Col>
            <Col md='6'>
              {
                this.state.tests.map(item => <Test data={item} key={item.id} />)
              }
            </Col>
          </Row>
          <Loading loading={this.state.isLoading} />
        </Container>
        <footer className='mui-container mui--text-center'>
          <a href='https://github.com/zrrrzzt/bigfive-compare' target='_blank'>bigfive-profile</a><br />
              Made with <span className='material-icons'>favorite</span> by <a href='https://github.com/zrrrzzt/' target='_blank'>zrrrzzt</a> and <a href='https://github.com/maccyber' target='_blank'>maccyber</a>
        </footer>
      </div>
    )
  }
}
