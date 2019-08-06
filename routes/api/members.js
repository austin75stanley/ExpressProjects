const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

router.get('/', (req, res) => res.json(members));

// get a single id of a member
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({
      msg: `Member Not Found with id of ${req.params.id}`,
    });
  }
});

// create a member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    email: req.body.email,
    name: req.body.name,
    status: 'active',
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({msg: `Please enter the name and email`});
  }
  members.push(newMember);
  // res.json(members);
  res.redirect('/');
});
// Update a member

router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.email = updMember.email ? updMember.email : member.email;
        member.name = updMember.name ? updMember.name : member.name;

        res.json({msg: 'Member Updated', member});
      }
    });
  } else {
    res.status(400).json({
      msg: `Member Not Found with id of ${req.params.id}`,
    });
  }
});
// Delete a member
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: 'Member Deleted:',
      members: members.filter((member) => member.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({
      msg: `Member Not Found with id of ${req.params.id}`,
    });
  }
});

module.exports = router;
