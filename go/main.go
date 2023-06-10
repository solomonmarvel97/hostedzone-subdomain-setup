package main

import (
	"fmt"
	"github.com/Pallinder/go-randomdata"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/route53"
)

func createSubdomain(domainName, subdomainName, hostedZoneId string) {
	sess := session.Must(session.NewSession())
	svc := route53.New(sess)

	changeBatch := &route53.ChangeBatch{
		Changes: []*route53.Change{
			{
				Action: aws.String("CREATE"),
				ResourceRecordSet: &route53.ResourceRecordSet{
					Name: aws.String(fmt.Sprintf("%s.%s", subdomainName, domainName)),
					Type: aws.String("A"),
					TTL:  aws.Int64(300),
					ResourceRecords: []*route53.ResourceRecord{
						{
							Value: aws.String("10.212.29.28"),
						},
					},
				},
			},
		},
	}

	params := &route53.ChangeResourceRecordSetsInput{
		HostedZoneId: aws.String(hostedZoneId),
		ChangeBatch:  changeBatch,
	}

	resp, err := svc.ChangeResourceRecordSets(params)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(resp)
}

func main() {
	domainName := "your-domain-name.com"
	subdomainName := randomdata.FirstName(randomdata.Male) + "-" + randomdata.LastName()
	hostedZoneId := "Your Hostedzone ID"

	createSubdomain(domainName, subdomainName, hostedZoneId)
}
