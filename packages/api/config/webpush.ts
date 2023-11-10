export default ({ env }) => ({
  vapidPublickey: env('VAPID_PUBLIC_KEY', 'BPt0uTR4bbEvNAgqRwvxRFEiYT0PvlUoidWszk43PuUaYn9yP_FF7_6aOJq-4q2ejVRlhTpE3epThT3jZN9Oc20'),
  vapidPrivatekey: env('VAPID_PRIVATE_KEY', 'vwoSAc3o6yY9PUqvWYMKNb4SUcQSJjJYGSciFRZBrVw'),
})
